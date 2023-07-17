const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: {type:String , required : true},
  password : {type:String , required: true},
  savedRecipes :[{type:mongoose.Schema.Types.ObjectId, ref: "recipes"}  ]
},{
    timestamps : true
});

module.exports = mongoose.model("users" , User)