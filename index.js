const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/auth");
const recipeRoutes = require("./src/routes/recipe");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://recipe-app-dineshms.onrender.com" , "https://recipe-app-dineshms.netlify.app"],
  })
);
app.use("/auth", userRoutes);
app.use("/recipe", recipeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`DB Connected and Server Running on ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Problem in connecting Db");
  });
