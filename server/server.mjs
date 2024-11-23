import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import categoriesRouter from "./routes/categories.mjs";
import authRouter from "./api/controllers/auth-controller.js"; // Přejmenován import pro čitelnost
import cookieParser from "cookie-parser";
import { env } from "./utils/env.mjs";
import productsRouter from "./routes/products.mjs";
import errorHandler from "./middleware/error-handler.mjs";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL || "http://localhost:3000", // Frontendová URL
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieParser());

// Připojení k databázi
try {
  console.info(`Connecting to MongoDB: ${env.MONGO_URI}`);
  await mongoose.connect(env.MONGO_URI);
  console.info("Connected to MongoDB");
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
}

// Endpointy
app.use("/api/auth", authRouter); // Použití přejmenovaného routeru
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

app.use(errorHandler);

// Spuštění serveru
const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
