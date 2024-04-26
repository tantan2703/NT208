const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  old_price: {
    type: Number,
  },
  new_price: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productsSchema);
module.exports = productModel;
