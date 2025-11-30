const blackListTokenModel = require("../db/models/blackListToken.model");
const Captain = require("../db/models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await Captain.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "captain already exist" });
  }

  const hashedPassword = await Captain.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ captain, token });
};

module.exports.captainLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain || !(await captain.comparePassword(password))) {
    return res.status(401).json({ message: "email or password is incorrect" });
  }
  captain.password = undefined;
  const token = captain.generateAuthToken();

  res.status(201).json({ captain, token });
};

module.exports.captainProfile = async (req, res) => {
  res.status(201).json(req.captain);
};

module.exports.captainLogout = async (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "no token found" });
  }

  await blackListTokenModel.create({ token });
  res.clearCookie("token");
  return res.status(200).json({ message: "captain logout" });
};
