const express = require("express");
const mongoose = require("mongoose");
// import routes 
const userRoutes=require("./routes/users")
// config app
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/users', userRoutes);




const port = (process.env.PORT ||= 3000);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
