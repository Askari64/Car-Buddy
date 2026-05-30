import * as carService from "../services/carService.js";

/**
 * Standard success response helper.
 * @param {Response} res - Express response object.
 * @param {any} data - Payload to send.
 * @param {number} [statusCode=200] - HTTP status code.
 */
const sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

/**
 * Standard error response helper.
 * @param {Response} res - Express response object.
 * @param {string} message - User-friendly error message.
 * @param {Error|null} [error=null] - The actual error object.
 * @param {number} [statusCode=500] - HTTP status code.
 */
const sendError = (res, message, error = null, statusCode = 500) => {
  console.error(`[Controller Error]: ${message}`, error || "");
  const response = { error: message };
  if (error && process.env.NODE_ENV !== "production") {
    response.details = error.message || error;
  }
  return res.status(statusCode).json(response);
};

/**
 * Get all cars with filtering, sorting, and search.
 */
export const getCars = async (req, res) => {
  try {
    const cars = await carService.fetchCars(req.query);
    return sendSuccess(res, cars);
  } catch (error) {
    return sendError(res, "Failed to fetch cars", error);
  }
};

/**
 * Get unique makes for filters.
 */
export const getMakes = async (req, res) => {
  try {
    const makes = await carService.fetchUniqueMakes();
    return sendSuccess(res, makes);
  } catch (error) {
    return sendError(res, "Failed to fetch car makes", error);
  }
};

/**
 * Get single car details by ID.
 */
export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carService.fetchCarById(id);

    if (!car) {
      return sendError(res, "Car not found", null, 404);
    }

    return sendSuccess(res, car);
  } catch (error) {
    return sendError(res, "Failed to fetch car details", error);
  }
};

/**
 * Car Buddy recommendation algorithm.
 */
export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await carService.calculateRecommendations(req.body);
    return sendSuccess(res, recommendations);
  } catch (error) {
    return sendError(res, "Failed to generate recommendations", error);
  }
};
