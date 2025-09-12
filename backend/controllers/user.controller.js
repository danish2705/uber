const { validationResult } = require("express-validator");
const User = require("../db/models/user.model");
const { createUser } = require("../services/user.service");

async function userRegister(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await User.hashPassword(password);
  const user = await createUser(firstName, lastName, email, hashedPassword);

  const token = user.generateAuthToken();
  res.status(201).json({ user, token });
}

async function userLogin(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ user, token });
}

async function userProfile(req, res, next) {
  res.status(200).json(req.user);
}

module.exports = {
  userRegister,
  userLogin,
  userProfile,
};
