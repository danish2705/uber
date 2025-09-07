const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must have atleast 3 characters"],
  },
  lastName: {
    type: String,
    minLength: [3, "Last name must be atleast 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "email must be atleast 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

// Instance method → available on document instances
userSchema.methods.generateAuthToken = function () {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const token = jwt.sign({ _id: this._id }, secret);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method → available on the model itself
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);


module.exports = User;
