const userModel = require("../models/userModels");
const bcrypt = require('bcryptjs');

async function userSignInController(req, res) {
    try {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!email) {
    throw new Error("please provide email");
  }
  if (!password) {
    throw new Error("please provide password");
  }if(!user){
    throw new Error('user not found')
  }
  const checkPassword =await bcrypt.compare(password, user.password)
  console.log('checkPassword',checkPassword);
  if(checkPassword){
    throw new Error ('please check password')
  }

} catch (err) {
  res.json({
    message: err.message || err,
    error: true,
    success: false,
  });
}
}


module.exports = userSignInController;
