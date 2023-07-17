const Recipe = require("../models/RecipeModel");
const User = require("../models/UserModel");
 

//create Recipe POST request

const createRecipe = async (req, res) => {
  const recipe = await Recipe.create(req.body);
  res.status(200).json(recipe);
};

//Get all recipes GET Request

const getRecipes = async (req, res) => {
  const recipe = await Recipe.find({});
  res.status(200).json(recipe);
};

//Save Recipe Put Request

const saveRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const user = await User.findById(req.body.userId);
    await user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
};

//Get saved Recipe GET request

const getSavedRecipeId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  saveRecipe,
  getSavedRecipeId,
  getSavedRecipes,
};
