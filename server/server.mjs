import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Vytvoření __dirname pro ES6 moduly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitní načtení .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import "./middleware/passport.js";
import categoriesRouter from "./routes/categories.mjs";
import authRouter from "./api/controllers/auth-controller.js";
import cookieParser from "cookie-parser";
import { env } from "./utils/env.mjs";
import productsRouter from "./routes/products.mjs";
import errorHandler from "./middleware/error-handler.mjs";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieParser());

// Připojení k databázi
try {
  console.info(`Connecting to MongoDB: ${process.env.MONGO_URI}`);
  await mongoose.connect(process.env.MONGO_URI);
  console.info("Connected to MongoDB");
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
}

// Endpointy
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

app.use(errorHandler);

// Spuštění serveru
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
