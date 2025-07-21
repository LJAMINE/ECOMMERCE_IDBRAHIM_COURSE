const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");
const { console } = require("inspector");
const Joi = require("joi");

exports.createProduct = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }

      try {
        // Convert array fields to strings/numbers
        const productData = {
          name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
          description: Array.isArray(fields.description)
            ? fields.description[0]
            : fields.description,
          price: Array.isArray(fields.price)
            ? Number(fields.price[0])
            : Number(fields.price),
          quantity: Array.isArray(fields.quantity)
            ? Number(fields.quantity[0])
            : Number(fields.quantity),
          category: Array.isArray(fields.category)
            ? fields.category[0]
            : fields.category,
          shipping: Array.isArray(fields.shipping)
            ? fields.shipping[0]
            : fields.shipping,
        };

        // Create product with processed data
        const product = new Product(productData);

        // Handle photo upload if exists
        if (files.photo) {
          if (files.photo.size > Math.pow(10, 6)) {
            return res.status(400).json({
              error: "Image size should be less than 1MB",
            });
          }
        }

        const schema = Joi.object({
            name:Joi.string().required().max(150),
            description:Joi.string().required().max(2000),
            // price:Joi.number().required(),
            // quantity:Joi.number().required(),
            // category:Joi.string().required(),
            // shipping:Joi.boolean().optional(),
        });

        const { error } = schema.validate(productData);

    if(error) {
        return res.status(400).json({
            error: error.details[0].message,
        })
    }

        // Save product using async/await
        const savedProduct = await product.save();

        res.json({
          message: "Product created successfully",
          product: savedProduct,
        });
      } catch (saveError) {
        return res.status(400).json({
          error: "Product not created",
          details: saveError.message,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};
