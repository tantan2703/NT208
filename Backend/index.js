const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Models/Product");
const cors = require("cors");
const multer = require("multer");

dotenv.config();

//config multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connect successfully");
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Find all
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  const productsWithImage = products.map((product) => ({
    ...product.toObject(),
    imageUrl: `http://localhost:3001/api/product/id/${product.id}`,
  }));
  res.status(200).json(productsWithImage);
});

//add a new product
app.post("/api/add/product", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
  }
});

//Get product
app.get("/api/product/id/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.image.data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.contentType(product.image.contentType);
    res.send(product.image.data);
  } catch (error) {
    console.log(error);
  }
});

//Search bar
app.get("/api/product/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    let _element = new RegExp(name, "i");
    let product = await Product.find({ name: _element });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

//Filter
//price
app.get("/api/product/filter/price/:sortPrice", async (req, res) => {
  try {
    const sort = parseInt(req.params.sortPrice);
    const product = await Product.find().sort({ price: sort });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});

//quantity
app.get("/api/product/filter/quantity/:sortQuantity", async (req, res) => {
  try {
    const sort = parseInt(req.params.sortQuantity);
    const product = await Product.find().sort({ price: sort });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});

//priceMin and priceMax
app.get("/api/product/filter/price", async (req, res) => {
  try {
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
    const product = await Product.find({
      price: { $gte: min, $lt: max },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});

//Min,max and category
app.get("/api/product/filter/:category/price", async (req, res) => {
  try {
    const category = req.params.category;
    const min = parseFloat(req.query.min);
    const max = parseFloat(req.query.max);
    const product = await Product.find({
      category: category,
      price: { $gte: min, $lt: max },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
});
