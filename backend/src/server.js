import express from "express";
import cors from "cors";
import "dotenv/config";
import carRoutes from "./routes/carRoutes.js";
import { connectDB, disconnectDB } from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Enable CORS so our frontend can connect
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

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
const server = app.listen(PORT, () => {
  console.log(`Car Buddy server listening on port ${PORT}`);
});

// ---------------------------------------------------------
// Graceful Shutdown & Error Handling
// ---------------------------------------------------------

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", async (error) => {
  console.error(`Unhandled Rejection: ${error}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

//Handle Uncaught Exceptions
process.on("uncaughtException", async (error) => {
  console.error(`Unhandled Exception: ${error}`);
  await disconnectDB();
  process.exit(1);
});

// Graceful Shutdown

process.on("SIGTERM", async () => {
  console.log("Terminate Signal recieved. Shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
