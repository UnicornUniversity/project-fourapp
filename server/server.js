require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/auth-new");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Frontendová URL
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieParser());
// Připojení k MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Připojeno k MongoDB"))
  .catch((err) => console.error("Chyba připojení k MongoDB:", err));

// Endpointy
app.use("/api/auth", authRoutes);

// Spuštění serveru
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
