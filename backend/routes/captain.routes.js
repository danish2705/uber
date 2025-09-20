const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerCaptain,
  captainLogin,
  captainProfile,
  captainLogout,
} = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("firstname should be atleast 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password should be atleast 6 characters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be atleast 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 4 })
      .withMessage("plate must be atleast of 3 characters"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("invalid type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password should be atleast 6 characters"),
  ],
  captainLogin
);

router.get("/profile", authCaptain, captainProfile);
router.get("/logout", authCaptain, captainLogout);

module.exports = router;
