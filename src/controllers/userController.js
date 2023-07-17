const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Create User POST Request:
const register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.json({ message: "user already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: hashedPassword,
  });
  res.status(200).json({ message: "User created" });
};

//Login POST Request

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "user doesn't exists" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "Username or password is incorrect!" });
  }
  const token = jwt.sign({ id: user._id }, process.env.SCERET_TEXT);
  res.json({ token, userId: user._id });
};

const verifyToken = (req, res, next) => { 
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SCERET_TEXT, (err) => {
      if (err) return res.sendStatus(403);
      next()
    });
  }else{
    res.sendStatus(401)
  }
};

module.exports = { register, login, verifyToken };
