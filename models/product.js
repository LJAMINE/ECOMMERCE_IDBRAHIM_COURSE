const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxHeight: 150,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxHeight: 2000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    quentity: {
      type: Number,
    },
    photo: {
      type: Buffer,
      contentType: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    shipping: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Product", productSchema);
