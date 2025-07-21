const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.salam = (req, res) => {
  res.send({ message: "Hello from user controller!" });
};

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// ...existing code...
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use async/await instead of callbacks
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User with this email does not exist",
      });
    }

    // Pass the password to authenticate method
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Set cookie with proper expiration
    res.cookie("token", token, { expires: new Date(Date.now() + 999999) });

    // Return user data (exclude sensitive fields)
    const { _id, name, email: userEmail, role } = user;

    return res.json({
      message: "User signed in successfully",

      token,
      user: {
        _id,
        name,
        email: userEmail,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// clear cookies and sign out user
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signed out successfully",
  });
};
