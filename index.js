const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// import routes 
const authRoutes=require("./routes/auth")
const usersRoutes=require("./routes/users")
const categoryRoutes=require("./routes/categories")
// config app
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db mongo
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connected successfully to", process.env.DATABASE);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

//   routes middleware 
app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api/category', categoryRoutes);





const port = (process.env.PORT ||= 3000);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
