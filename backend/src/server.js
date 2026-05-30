import express from "express";
import cors from "cors";
import "dotenv/config";
import carRoutes from "./routes/carRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so our frontend can connect
app.use(cors());

// Parse JSON payloads
app.use(express.json());

// API Routes
app.use("/api/cars", carRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Car Buddy API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandle server error:", err);
  res.status(500).json({ error: "An unexpected error occurred on the server" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Car Buddy server listening on port ${PORT}`);
});
