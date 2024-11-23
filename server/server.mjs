import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import passport from "passport";
import categoriesRouter from "./routes/categories.mjs";
import authRouter from "./routes/auth-new.mjs";
import cookieParser from "cookie-parser";
import { env } from "./utils/env.mjs";
import productsRouter from "./routes/products.mjs";

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

try {
  console.info(`Connecting to mongo db: ${env.MONGO_URI}`);
  await mongoose.connect(env.MONGO_URI);

  console.info("Connected to mongo db");
} catch (error) {
  console.error("Failed to connect to db", error);
}

// Endpointy
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

// Spuštění serveru
const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
