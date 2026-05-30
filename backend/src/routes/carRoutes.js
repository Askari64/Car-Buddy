import express from "express";
import {
  getCars,
  getMakes,
  getCarById,
  getRecommendations,
} from "../controllers/carController.js";

const router = express.Router();

// Fetch cars with filters and queries
router.get("/", getCars);

// Fetch unique list of makes for filter dropdowns
router.get("/makes", getMakes);

// Fetch specific car by ID
router.get("/:id", getCarById);

// Fetch recommendations based on user quiz answers
router.post("/recommendations", getRecommendations);

export default router;
