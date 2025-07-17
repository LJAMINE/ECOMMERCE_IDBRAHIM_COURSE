const User = require("../models/user");

exports.salam = (req, res) => {
  res.send({ message: "Hello from user controller!" });
};


exports.signup = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json({
            message: "User created successfully",
            user: savedUser
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};