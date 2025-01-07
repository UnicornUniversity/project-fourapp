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
import requestLogger from "./middleware/request-logger.mjs";
import auditlogRouter from "./routes/auditlog-router.js";
import { auditRoute } from "./middleware/audit-route.mjs";
import userRouter from "./routes/users.mjs";
import ordersRouter from "./routes/orders.mjs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieParser());
app.use(requestLogger);
app.use(auditRoute);

app.use("/images", express.static(path.join(__dirname, "assets/images")));

// Připojení k databázi
try {
  console.info(`Connecting to MongoDB: ${env.MONGO_URI}`);
  await mongoose.connect(env.MONGO_URI);
  console.info("Connected to MongoDB");
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
}

// Endpointy
app.use("api/auth", authRouter);
app.use("api/categories", categoriesRouter);
app.use("api/products", productsRouter);
app.use("api/users", userRouter);
app.use("api/orders", ordersRouter);
app.use("api/auditlogs", auditlogRouter);
app.use(errorHandler);

// Spuštění serveru
const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
