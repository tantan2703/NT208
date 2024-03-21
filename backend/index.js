const port = 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

app.use(express.json());
app.use(cors());

// UID Generation
function generateID() {
    return uuid.v4();
}

// Database connection with MongoDB
MongoDB_URI = "mongodb://localhost:27017/WatchShop";
mongoose.connect(MongoDB_URI);


// API Creation
app.get('/', (req, res) => {
    res.send("Hello from the server");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images/",
    filename:(req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
})

// Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Sechema for Creating Products
const Product = mongoose.model("watch", {
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
}, "watches");

// Add Product API

app.post('/addproduct', async (req, res) => {
    const product = new Product(
        {
            id: generateID(),
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            available: req.body.available,
        }
    )
    console.log(product);
    await product.save();
    console.log('Saved');
    res.json(
        {
            success: true,
            name: req.body.name,
        }
    );
    
}
);

// Remove Product API
app.post('/removeproduct', async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    if (product) {
        res.json(
            {
                success: true,
                name: product.name,
                id: product.id,
            }
        );
        console.log(product);
        console.log("Product Removed");
    } else {
        res.json(
            {
                success: false,
                name: "Product not found",
            }
        );
        console.log("Product not found");
    }
}
);

// Get All Products API
app.get('/allproducts', async (req, res) => {
    const products = await Product.find();
    res.json(products);
    console.log("All Products Fetched");
}
);

// Creating API for User Authentication
const User = mongoose.model("user", {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, "users");

// Creating Endpoint for registering a user
app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res
        .status(400)
        .json(
            {
                success: false,
                message: "Email already exists",
            }
        );
    }
    let cart = {};
    cart["0"] = 0;
    const user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        }
    );

    await user.save();

    const data = {
        user:{
            id: user.id,
        }
    }

    const token = jwt.sign(data, "secret_ecom");
    res.json(
        {
            success: true,
            token: token,
        }
    );
}
);

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) 
    {
        const passCompare = req.body.password === user.password;
        if (passCompare) 
        {
            const data = {
                user:{
                    id: user.id,
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json(
                {
                    success: true,
                    token: token,
                }
            );
        }
        else
        {
            res.json(
                {
                    success: false,
                    message: "Invalid Password",
                }
            );
        }
    }
    else
    {
        res.json(
            {
                success: false,
                message: "User not found",
            }
        );
    }
        
});


// Creating endpoint for newcollection data

app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
}
);

// Creating endpoint for popular watches
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0, 4);
    console.log("Popular Women Watches Fetched");
    res.send(popular_in_women);
}
);

// Creating middleware for user authentication
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({
            errors: "Please authenticate using a valid token",
        });
    }
    else
        try {
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({
                errors: "Please authenticate using a valid token",
            });
        }
}


// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (req.body.itemId in userData.cartData) {
        userData.cartData[req.body.itemId] += 1;
    }
    else {
        userData.cartData[req.body.itemId] = 1;
    }
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData:userData.cartData });
    res.send("Product Added to Cart");
});


// creating endpoint for removing products from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (req.body.itemId in userData.cartData) {
        userData.cartData[req.body.itemId] -= 1;
        if (userData.cartData[req.body.itemId] === 0) {
            delete userData.cartData[req.body.itemId];
        }
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData:userData.cartData });
        res.send("Product Removed from Cart");
    }
    else {
        res.send("Product not found in cart");
    }
    
});


// Creating endpoint for getting cartdata
app.get('/getcart', fetchUser, async (req, res) => {
    console.log("Get Cart Data");
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Listening to the server
app.listen(port, (err) => {
    if (err) {
        console.log("Error in connecting to the server");
    } else {
        console.log("Server is running on port: " + port);
    }
});

