import { prisma } from "../db.js";

/**
 * Builds the database where clause based on query filters.
 * @param {Object} filters - Search and filtering options.
 * @returns {Object} Prisma where clause.
 */
export const buildWhereClause = (filters = {}) => {
  const {
    make,
    category,
    transmission,
    fuelType,
    minPrice,
    maxPrice,
    minSafetyRating,
    q,
  } = filters;

  const where = {};

  if (make) where.make = { equals: make, mode: "insensitive" };
  if (category) where.category = { equals: category, mode: "insensitive" };
  if (transmission) where.transmission = { equals: transmission, mode: "insensitive" };
  if (fuelType) where.fuelType = { equals: fuelType, mode: "insensitive" };

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  if (minSafetyRating) {
    where.safetyRating = { gte: parseFloat(minSafetyRating) };
  }

  if (q) {
    where.OR = [
      { make: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
      { variant: { contains: q, mode: "insensitive" } },
      { category: { contains: q, mode: "insensitive" } },
    ];
  }

  return where;
};

/**
 * Builds the database orderBy clause based on sortBy parameter.
 * @param {string} sortBy - Sort key and order (e.g., 'price-asc').
 * @returns {Array|Object} Prisma orderBy clause.
 */
export const buildOrderByClause = (sortBy) => {
  const defaultOrder = [
    { make: "asc" },
    { model: "asc" }
  ];

  if (sortBy) {
    const [field, order] = sortBy.split("-");
    const normalizedOrder = order ? order.toLowerCase() : "";
    
    if (normalizedOrder === "asc" || normalizedOrder === "desc") {
      // Use explicit mapping to prevent dynamic key assignment (prototype pollution / bracket notation risk)
      switch (field) {
        case "make":
          return { make: normalizedOrder };
        case "model":
          return { model: normalizedOrder };
        case "price":
          return { price: normalizedOrder };
        case "year":
          return { year: normalizedOrder };
        case "category":
          return { category: normalizedOrder };
        case "transmission":
          return { transmission: normalizedOrder };
        case "fuelType":
          return { fuelType: normalizedOrder };
        case "mileage":
          return { mileage: normalizedOrder };
        case "safetyRating":
          return { safetyRating: normalizedOrder };
        case "horsepower":
          return { horsepower: normalizedOrder };
        case "torque":
          return { torque: normalizedOrder };
        case "seats":
          return { seats: normalizedOrder };
        default:
          break;
      }
    }
  }

  return defaultOrder;
};

/**
 * Fetches all cars that match filtering, sorting, and search criteria.
 * @param {Object} filters - Query parameters.
 * @returns {Promise<Array>} List of cars.
 */
export const fetchCars = async (filters) => {
  const where = buildWhereClause(filters);
  const orderBy = buildOrderByClause(filters.sortBy);

  return await prisma.car.findMany({
    where,
    orderBy,
    include: {
      reviews: true,
    },
  });
};

/**
 * Fetches unique list of makes for filter dropdowns.
 * @returns {Promise<Array<string>>} Sorted list of unique car makes.
 */
export const fetchUniqueMakes = async () => {
  const cars = await prisma.car.findMany({
    select: { make: true },
    distinct: ["make"],
  });
  return cars.map((c) => c.make).sort();
};

/**
 * Fetches a single car's details along with its reviews sorted by creation date.
 * @param {string} id - The ID of the car.
 * @returns {Promise<Object|null>} Car object or null.
 */
export const fetchCarById = async (id) => {
  return await prisma.car.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
};

/**
 * Generates recommendation matching score and reasons for each car.
 * @param {Object} quizAnswers - Survey answers.
 * @returns {Promise<Array>} Top 5 recommended cars with matchScore and matchReasons.
 */
export const calculateRecommendations = async (quizAnswers = {}) => {
  const {
    budget,       // Number (max price)
    category,     // String (SUV, Sedan, Hatchback, Truck, Coupe, any)
    fuelType,     // String (Electric, Hybrid, Gasoline, Diesel, any)
    transmission, // String (Automatic, Manual, any)
    useCase,      // String (Commuting, Family, Performance, Off-road)
    seats,        // Number (min seats)
  } = quizAnswers;

  // Fetch all cars to score them
  const allCars = await prisma.car.findMany({
    include: {
      reviews: true,
    },
  });

  const recommendations = allCars
    .map((car) => {
      let score = 0;
      let reasons = [];

      // 1. Budget scoring (Max: 30 pts)
      if (car.price <= budget) {
        score += 30;
        reasons.push("Well within your budget");
      } else if (car.price <= budget * 1.1) {
        // Up to 10% over budget
        const percentageOver = ((car.price - budget) / budget) * 100;
        const points = Math.max(0, Math.round(30 - percentageOver * 3));
        score += points;
        reasons.push("Slightly above budget, but worth considering");
      } else {
        // Too far over budget
        return null; 
      }

      // 2. Category matching (Max: 15 pts)
      if (category && category !== "any") {
        if (car.category.toLowerCase() === category.toLowerCase()) {
          score += 15;
          reasons.push(`Perfect body style match (${car.category})`);
        }
      } else {
        score += 10; // Neutral points for any category
      }

      // 3. Fuel Type matching (Max: 15 pts)
      if (fuelType && fuelType !== "any") {
        if (car.fuelType.toLowerCase() === fuelType.toLowerCase()) {
          score += 15;
          reasons.push(`Uses preferred fuel type (${car.fuelType})`);
        }
      } else {
        score += 10;
      }

      // 4. Transmission matching (Max: 10 pts)
      if (transmission && transmission !== "any") {
        if (car.transmission.toLowerCase() === transmission.toLowerCase()) {
          score += 10;
          reasons.push(`Matches your transmission preference (${car.transmission})`);
        }
      } else {
        score += 8;
      }

      // 5. Seating requirement (Max: 10 pts)
      if (seats) {
        if (car.seats >= seats) {
          score += 10;
        } else {
          // Filter out if doesn't meet minimum seat count
          return null;
        }
      }

      // 6. Use case alignment (Max: 20 pts)
      if (useCase === "Commuting") {
        // Prioritize high mileage/fuel efficiency
        if (car.mileage >= 40) {
          score += 20;
          reasons.push("Outstanding fuel economy, perfect for commuting");
        } else if (car.mileage >= 30) {
          score += 15;
          reasons.push("Good fuel efficiency for daily drives");
        } else if (car.mileage >= 20) {
          score += 10;
        } else {
          score += 2;
        }
      } else if (useCase === "Family") {
        // Prioritize safety rating and seat count
        if (car.safetyRating >= 4.8) {
          score += 20;
          reasons.push("Top-tier safety rating, excellent for kids");
        } else if (car.safetyRating >= 4.5) {
          score += 15;
          reasons.push("Very high safety scores");
        } else {
          score += 10;
        }
      } else if (useCase === "Performance") {
        // Prioritize horsepower
        if (car.horsepower >= 350) {
          score += 20;
          reasons.push(`Thrilling performance with ${car.horsepower} HP`);
        } else if (car.horsepower >= 250) {
          score += 15;
          reasons.push("Punchy acceleration and power");
        } else {
          score += 5;
        }
      } else if (useCase === "Off-road") {
        // Prioritize torque and AWD features
        const hasAWD = car.features.some(f => 
          f.toLowerCase().includes("awd") || 
          f.toLowerCase().includes("all-wheel") || 
          f.toLowerCase().includes("off-road") || 
          f.toLowerCase().includes("4wd")
        );

        if (hasAWD) {
          score += 10;
          reasons.push("Equipped with AWD/Off-road capabilities");
        }

        if (car.torque && car.torque >= 350) {
          score += 10;
          reasons.push("High torque engine for tough terrains");
        } else if (car.torque && car.torque >= 200) {
          score += 7;
        } else {
          score += 3;
        }
      }

      // Calculate final percentage score
      const maxPossibleScore = 100;
      const finalPercentage = Math.min(100, Math.round((score / maxPossibleScore) * 100));

      return {
        ...car,
        matchScore: finalPercentage,
        matchReasons: reasons.slice(0, 3) // Show top 3 reasons
      };
    })
    .filter((car) => car !== null)
    .sort((a, b) => b.matchScore - a.matchScore);

  return recommendations.slice(0, 5); // Return top 5 recommendations
};
