require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require('cors');

const app = express();

//Controllers
const authController = require("./api/controllers/auth-controller")

app.use(express.json());

app.use(cors());



// Připojení k MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Připojeno k MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
