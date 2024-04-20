const port = 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const Product = require('./models/Product');
const User = require('./models/User');
const Message = require('./models/Message');
const { Server } = require('socket.io');


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

// Add Product API

app.post('/addproduct', async (req, res) => {
    const product = new Product(
        {
            id: generateID(),
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            sex: req.body.sex,
            size: req.body.size,
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
    const products = await Product.find({});
    res.json(products);
    console.log("All Products Fetched");
}
);

// Creating API for User Authentication
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
    let message = await Message.findOne({ user_id: user.id });
    
            if (!message) {
                message = new Message({ user_id: user.id, messages: [] });
                await message.save();
            }
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
            let message = await Message.findOne({ user_id: user.id });
    
            if (!message) {
                message = new Message({ user_id: user.id, messages: [] });
                await message.save();
            }
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

// Creating endpoint for getting all users data
app.get('/allusers', async (req, res) => {
    const users = await User.find({});
    res.json(users);
    console.log(users);
    console.log("All Users Fetched");
}
);

// Creating endpoint for newcollection data

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
}
);

// Creating endpoint for popular women watches
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
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get Cart Data");
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});


// Creating endpoint for getiing chat messages
app.get('/getmessages', fetchUser, async (req, res) => {
    let message = await Message.find({
        user_id:req.user.id,
      });
    message = message[0];
    if (!message) {
        return res.json({messages: []});
    }
    res.json(message.messages);
});

// Creating endpoint for getting all messages
app.get('/admingetmessages', async (req, res) => {
    const message = await Message.find({});
    res.json(message);
});



// Listening to the server
const server = app.listen(port, (err) => {
    if (err) {
        console.log("Error in connecting to the server");
    } else {
        console.log("Server is running on port: " + port);
    }
});


const io = new Server({cors: 'http://localhost:8888'});
// Authentication Middleware
io.use( async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token === 'admin') {
        return next();
    }
    if (!token) {
        return next(new Error("Please authenticate using a valid token"));
    }
    try {
        const data = jwt.verify(token, "secret_ecom");
        socket.user = data.user;
        socket.join(data.user.id);
        console.log("User connected: ", data.user.id);
        next();
    } catch (error) {
        return next(new Error("Please authenticate using a valid token"));
    }
});
// Creating Websocket Server
io.on('connection', async (socket) => {
    const token = socket.handshake.auth.token;
    if (token === 'admin') {
        // Get all users from database and join their rooms by their id
        const users = await User.find({});
        users.forEach(user => {
            socket.join(user._id);
            console.log("Admin connected to user: ", user._id);
        });
    }
    console.log(socket.id);
    
    // Hello from the server
    socket.emit('message', 'Hello from the server');

    socket.on('message', (data) => {
        console.log(data);
    });
    socket.on('join-room', (room, callback) => {
        socket.join(room);
        callback("Joined room: ", room);
    });


    // Admin add message with user id
    socket.on('adminAddMessage', async (data, callback) => {
            try
            {
                await Message.updateOne(
                    { user_id: data.user_id }, // Điều kiện tìm kiếm
                    {
                        $push: {
                            messages: {
                                content: data.content,
                                timeStamp: Date.now(),
                                userMessage: data.userMessage
                            }
                        }
                    }
                );
                io.to(data.user_id).emit('getMessage');
                callback("Message sent");
            }
            catch (error) {
                console.error('Lỗi khi thêm tin nhắn:', error);
            }    
    });


    // Add Message Event
    socket.on('addMessage', async (data, callback) => {
        // Add message to database
        try {
            let message = await Message.findOne({ user_id: socket.user.id });
    
            if (!message) {
                message = new Message({ user_id: socket.user.id, messages: [] });
                await message.save();
            }
            await Message.updateOne(
                { user_id: socket.user.id }, // Điều kiện tìm kiếm
                {
                    $push: {
                        messages: {
                            content: data.content,
                            timeStamp: Date.now(),
                            userMessage: data.userMessage
                        }
                    }
                }
            );
            
            console.log('Đã thêm tin nhắn thành công!');
            callback("Message sent");
            io.emit('getMessage');
        } catch (error) {
            console.error('Lỗi khi thêm tin nhắn:', error);
        }             
    });
});

io.listen(8888, () => {
    console.log("Socket server is running on port: 8888");
});




