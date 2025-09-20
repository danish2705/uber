const blackListTokenModel = require("../db/models/blackListToken.model");
const captainModel = require("../db/models/captain.model");
const User = require("../db/models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded._id);

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = { authUser, authCaptain };
