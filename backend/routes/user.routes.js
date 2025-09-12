const express = require("express");
const { body } = require("express-validator");
const {
  userRegister,
  userLogin,
  userProfile,
  logoutUser,
} = require("../controllers/user.controller");
const authUser = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of minimum 6 characters"),
  ],
  userRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userLogin
);

router.get("/profile", authUser, userProfile);
router.get("/logout", authUser, logoutUser);

module.exports = router;
