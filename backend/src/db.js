import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client/index.js";

// Setup connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Test the connection on server startup
const connectDB = async () => {
  try {
    // A simple query to wake up Neon DB and verify the pool is working
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error(`❌ Error Connecting to DB: ${error.message}`);
    process.exit(1); // Kill the server if the DB is down
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
