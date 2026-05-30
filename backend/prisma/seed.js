import { prisma } from "../src/db.js";

async function main() {
  console.log("Cleaning database...");
  await prisma.review.deleteMany();
  await prisma.car.deleteMany();

  console.log("Seeding cars and reviews...");

  const carsData = [
    {
      make: "Toyota",
      model: "RAV4 Hybrid",
      variant: "XLE Premium",
      price: 34350,
      year: 2024,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Hybrid",
      mileage: 40.0, // 41 city / 38 highway mpg
      safetyRating: 5.0,
      engine: "2.5L 4-Cylinder Hybrid",
      horsepower: 219,
      torque: 163,
      seats: 5,
      features: ["All-Wheel Drive", "Apple CarPlay", "Adaptive Cruise Control", "Power Liftgate", "Blind Spot Monitor", "Sunroof"],
      imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Mark D.", rating: 5, comment: "Incredible fuel efficiency for an SUV! Feels spacious and very safe for my family commutes." },
          { author: "Sarah L.", rating: 4, comment: "Very reliable, but the infotainment screen is a bit basic. Overall an excellent daily driver." }
        ]
      }
    },
    {
      make: "Tesla",
      model: "Model 3",
      variant: "Long Range AWD",
      price: 47490,
      year: 2024,
      category: "Sedan",
      transmission: "Automatic",
      fuelType: "Electric",
      mileage: 130.0, // MPGe equivalent
      safetyRating: 5.0,
      engine: "Dual Motor AC Permanent Magnet",
      horsepower: 425,
      torque: 361,
      seats: 5,
      features: ["Autopilot", "15-inch Touchscreen", "Glass Roof", "Heated Seats", "Premium Audio", "Wireless Phone Charging"],
      imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Jared P.", rating: 5, comment: "Insane acceleration and technology. The range easily lasts me the whole week." },
          { author: "Linda W.", rating: 4, comment: "Excellent drive, but build quality has a few small panel gaps. Still love the autopilot." }
        ]
      }
    },
    {
      make: "Honda",
      model: "Civic",
      variant: "Sport Touring",
      price: 31050,
      year: 2024,
      category: "Hatchback",
      transmission: "Manual",
      fuelType: "Gasoline",
      mileage: 33.0,
      safetyRating: 5.0,
      engine: "1.5L 4-Cylinder Turbo",
      horsepower: 180,
      torque: 177,
      seats: 5,
      features: ["6-Speed Manual", "Bose Premium Sound", "Leather Trimmed Seats", "Lane Keeping Assist", "Apple CarPlay"],
      imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Ethan K.", rating: 5, comment: "Manual gearbox is butter smooth. Fuel economy is amazing and it handles like a dream!" },
          { author: "David T.", rating: 5, comment: "Practical hatch space, super fun to drive, looks sporty and doesn't break the bank." }
        ]
      }
    },
    {
      make: "Ford",
      model: "F-150 Lightning",
      variant: "Lariat",
      price: 76995,
      year: 2024,
      category: "Truck",
      transmission: "Automatic",
      fuelType: "Electric",
      mileage: 70.0, // MPGe
      safetyRating: 4.5,
      engine: "Dual Electric Motors",
      horsepower: 580,
      torque: 775,
      seats: 5,
      features: ["Mega Power Frunk", "Pro Power Onboard", "15.5-inch Touchscreen", "Leather Heated/Cooled Seats", "Tow Package"],
      imageUrl: "https://images.unsplash.com/photo-1695662051317-0d500ff5ee8f?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Robert M.", rating: 5, comment: "Best work truck I have ever owned. Being able to power my tools from the bed is a game changer." },
          { author: "Clara S.", rating: 4, comment: "Amazing torque and fast charging, but towing really eats into the battery range." }
        ]
      }
    },
    {
      make: "Hyundai",
      model: "Ioniq 5",
      variant: "Limited RWD",
      price: 53500,
      year: 2024,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Electric",
      mileage: 114.0, // MPGe
      safetyRating: 5.0,
      engine: "Single Electric Motor",
      horsepower: 225,
      torque: 258,
      seats: 5,
      features: ["800V Ultra-Fast Charging", "Vision Roof", "Head-Up Display with AR", "Relaxation Front Seats", "V2L Power Output"],
      imageUrl: "https://images.unsplash.com/photo-1669062391090-ffb846e492b4?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Sophia V.", rating: 5, comment: "Charges from 10% to 80% in 18 minutes! The interior feels like a futuristic lounge." },
          { author: "Tom H.", rating: 5, comment: "Distinctive retro-modern styling that turns heads everywhere. Extremely quiet ride." }
        ]
      }
    },
    {
      make: "BMW",
      model: "M340i",
      variant: "xDrive",
      price: 59600,
      year: 2024,
      category: "Sedan",
      transmission: "Automatic",
      fuelType: "Gasoline",
      mileage: 26.0,
      safetyRating: 5.0,
      engine: "3.0L Turbo Inline 6",
      horsepower: 382,
      torque: 369,
      seats: 5,
      features: ["Adaptive M Suspension", "Harmon Kardon Sound System", "Launch Control", "Sport Seats", "Head-Up Display"],
      imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Alex R.", rating: 5, comment: "The B58 engine is a masterpiece. Incredible performance and sound, yet behaves perfectly as a daily commuter." },
          { author: "Lucas B.", rating: 4, comment: "Suspension is a bit stiff in sport mode, but handling is razor-sharp. Extremely fast." }
        ]
      }
    },
    {
      make: "Subaru",
      model: "Outback",
      variant: "Onyx Edition XT",
      price: 39360,
      year: 2024,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Gasoline",
      mileage: 25.0,
      safetyRating: 5.0,
      engine: "2.4L Turbocharged Boxer 4",
      horsepower: 260,
      torque: 277,
      seats: 5,
      features: ["Symmetrical All-Wheel Drive", "Dual-Function X-MODE", "StarTex Water-Repellent Seats", "Raised Roof Rails", "EyeSight Driver Assist"],
      imageUrl: "https://images.unsplash.com/photo-1695221975765-b7787498c460?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Nate K.", rating: 5, comment: "Ultimate road trip car. Cleared deep snow effortlessly. Very comfortable ride." },
          { author: "Diana G.", rating: 4, comment: "Great ground clearance and storage space. Engine has plenty of power, but the CVT can drone on hills." }
        ]
      }
    },
    {
      make: "Mazda",
      model: "CX-5",
      variant: "2.5 S Carbon Edition",
      price: 32000,
      year: 2024,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Gasoline",
      mileage: 28.0,
      safetyRating: 5.0,
      engine: "2.5L 4-Cylinder",
      horsepower: 187,
      torque: 186,
      seats: 5,
      features: ["Standard i-ACTIV AWD", "Red Leather Seats", "19-inch Alloy Wheels", "10.25-inch Display", "Power Moonroof"],
      imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Emily F.", rating: 5, comment: "The interior feels like a luxury car double the price. Drives beautifully and looks stunning in Polymetal Gray." },
          { author: "John D.", rating: 4, comment: "Handling is excellent. The backseat is a bit tight compared to a RAV4, but the driving dynamics make up for it." }
        ]
      }
    },
    {
      make: "Toyota",
      model: "Prius",
      variant: "Limited",
      price: 34465,
      year: 2024,
      category: "Hatchback",
      transmission: "Automatic",
      fuelType: "Hybrid",
      mileage: 52.0,
      safetyRating: 5.0,
      engine: "2.0L 4-Cylinder Hybrid",
      horsepower: 196,
      torque: 139,
      seats: 5,
      features: ["Premium JBL Audio", "Glass Roof", "Ventilated Front Seats", "Advanced Park Assist", "Digital Rearview Mirror"],
      imageUrl: "https://images.unsplash.com/photo-1708244796381-197ee4556488?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Gary S.", rating: 5, comment: "Toyota finally made the Prius look sexy! Averaging 54 mpg on my daily commute. Accelerates much faster now too." },
          { author: "Renee K.", rating: 5, comment: "Love the new look and speed. Quiet cabin, outstanding technology features, and fits in any parking spot." }
        ]
      }
    },
    {
      make: "Porsche",
      model: "911 Carrera",
      variant: "S",
      price: 131300,
      year: 2024,
      category: "Coupe",
      transmission: "Manual",
      fuelType: "Gasoline",
      mileage: 20.0,
      safetyRating: 4.0,
      engine: "3.0L Twin-Turbo Flat 6",
      horsepower: 443,
      torque: 390,
      seats: 4,
      features: ["Active Suspension (PASM)", "Sport Exhaust System", "LED Matrix Headlights", "Carbon Fiber Trim", "7-Speed Manual"],
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Christian G.", rating: 5, comment: "The benchmark sports car. The manual shifting feels mechanical and satisfying. Instant classic." },
          { author: "Olivia S.", rating: 5, comment: "Incredible handling, beautiful sound, and surprisingly daily-drivable. Worth every single penny." }
        ]
      }
    },
    {
      make: "Jeep",
      model: "Wrangler Rubicon",
      variant: "4xe Hybrid",
      price: 61395,
      year: 2024,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Hybrid",
      mileage: 49.0, // combined MPGe
      safetyRating: 4.0,
      engine: "2.0L Turbo Hybrid",
      horsepower: 375,
      torque: 470,
      seats: 5,
      features: ["Electronic Sway Bar Disconnect", "33-inch All-Terrain Tires", "Removable Doors & Roof", "Rock Rails", "Dana 44 Axles"],
      imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Dustin B.", rating: 5, comment: "Off-roading in pure silence on electric power is magic. Has all the torque you could ever want instantly." },
          { author: "Amber T.", rating: 4, comment: "Insanely capable trail rig. Gas mileage is ok when battery dies, but electric-only commute range is great." }
        ]
      }
    },
    {
      make: "Chevrolet",
      model: "Silverado 1500",
      variant: "ZR2",
      price: 69900,
      year: 2024,
      category: "Truck",
      transmission: "Automatic",
      fuelType: "Gasoline",
      mileage: 15.0,
      safetyRating: 4.5,
      engine: "6.2L EcoTec3 V8",
      horsepower: 420,
      torque: 460,
      seats: 5,
      features: ["Multimatic DSSV Dampers", "Front & Rear E-Lockers", "33-inch Mud Terrain Tires", "13.4-inch Touchscreen", "Bose Audio"],
      imageUrl: "https://images.unsplash.com/photo-1533598190302-ad17195986fe?auto=format&fit=crop&q=80&w=800",
      reviews: {
        create: [
          { author: "Greg J.", rating: 5, comment: "A beast off-road. The suspension feels like floating over jumps and rough trails. V8 sound is addictive." },
          { author: "Tina R.", rating: 4, comment: "Extremely comfortable and spacious cabin. Fuel economy is terrible, but you buy a V8 ZR2 for capability, not mileage." }
        ]
      }
    }
  ];

  for (const car of carsData) {
    await prisma.car.create({
      data: car
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
