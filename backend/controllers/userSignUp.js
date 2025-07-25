const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User already exist");
    }
    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }
    if (!name) {
      throw new Error("please provide name");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("something is wrong");
    }

    const payLoad = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    const userData = new userModel(payLoad);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "user created successfully",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
