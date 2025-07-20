const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/User");
const Blog = require("./models/Blog");
require("dotenv").config();
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/AppError");

// Connect with DB and serve API
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");

        // Start server after DB is connected
        app.listen(process.env.PORT, () => {
            console.log(
                `Devblogs API is Listening on Port ${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error", err);
    });

// for JSON POST/PUT requests
app.use(express.json());

// -----Auth Routes-----

// Register Route
app.post(
    "/api/register",
    catchAsync(async (req, res, next) => {
        // Checking if JWT_SECRET is present in .env before even creating a new user. this way we avoid creating users and unable to login them.
        if (!process.env.JWT_SECRET) {
            return next(
                new AppError(
                    "JWT_SECRET not found in environment variables",
                    500
                )
            );
        }

        const { username, email, password } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return next(new AppError("Email already registered", 400));
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return next(new AppError("Username already in use", 400));
        }

        const user = new User({ username, email, password });
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            status: "success",
            token, // Send the JWT token to the client
        });
    })
);

// Login Route
app.post(
    "/api/login",
    catchAsync(async (req, res, next) => {
        // Checking for JWT_SECRET in .env before starting login process
        if (!process.env.JWT_SECRET) {
            return next(
                new AppError(
                    "JWT_SECRET not found in environment variables",
                    500
                )
            );
        }

        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError("Invalid email or password", 400));
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new AppError("Invalid email or password", 400));
        }

        // Generate JWT token for the user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d", // Token expiration time
        });

        res.status(200).json({
            status: "success",
            token, // Send the JWT token to the client
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    })
);

// -----App Routes-----
app.get("/", (req, res) => {
    res.send("Hello Devs");
});

// GET all blogposts
app.get(
    "/api/posts",
    catchAsync(async (req, res, next) => {
        const allBlogs = await Blog.find({});
        if (!allBlogs) {
            return next(new AppError("Failed to load blogs", 500));
        }
        res.status(200).json(allBlogs);
    })
);

// GET a single blogpost from id
app.get(
    "/api/posts/:id",
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const blogFound = await Blog.findById(id);
        res.status(200).json(blogFound);
    })
);

// Error handling middleware
app.use((err, req, res, next) => {
    let { message = "Something went wrong", statusCode = 500 } = err;

    // If the error is an instance of AppError, use its properties for message and status code
    if (err instanceof AppError) {
        message = err.message || message; // Error message from AppError instance
        statusCode = err.statusCode || statusCode; // Status code from AppError instance
    }

    // Logging operational erros or bugs for debugging
    if (err.isOperational) {
        console.error("Operational Error: ", err);
    } else {
        console.error("Non-Operational Error (Bug): ", err);
    }

    // Sending error responses with status code to client
    res.status(statusCode).json({
        status: statusCode < 500 ? "fail" : "error",
        error: message,
    });
});
