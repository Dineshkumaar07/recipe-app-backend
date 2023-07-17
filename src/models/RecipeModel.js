const mongoose = require("mongoose");

const RecipeModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String }],
  instructions: { type: String, required: true },
  image: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwner: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const recipe = mongoose.model("recipes", RecipeModel);
module.exports = recipe;
