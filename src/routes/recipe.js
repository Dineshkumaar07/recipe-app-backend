const express = require("express");
const {
  createRecipe,
  getRecipes,
  saveRecipe,
  getSavedRecipeId,
  getSavedRecipes,
} = require("../controllers/recipeController");

const {verifyToken} = require('../controllers/userController')
const router = express.Router();

router.post("/", verifyToken,createRecipe);
router.get("/", getRecipes);
router.put("/",verifyToken, saveRecipe);
router.get("/savedrecipeid/:userId", getSavedRecipeId);
router.get("/savedrecipe/:userId", getSavedRecipes);

module.exports = router;
