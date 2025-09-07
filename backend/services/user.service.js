const userModel = require("../db/models/user.model");

async function createUser(firstName, lastName, email, password) {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
  });

  return user;
}

module.exports = { createUser };
