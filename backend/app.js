const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./models/Blog");
require("dotenv").config();
const catchAsync = require("./utils/catchAsync");

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

app.get("/", (req, res) => {
    res.send("Hello Devs");
});

// GET all blogposts
app.get(
    "/api/posts",
    catchAsync(async (req, res) => {
        const allBlogs = await Blog.find({});
        res.status(200).json(allBlogs);
    })
);

// GET a single blogpost from id
app.get(
    "/api/posts/:id",
    catchAsync(async (req, res) => {
        const { id } = req.params;
        try {
            const blogFound = await Blog.findById(id);
            if (!blogFound) {
                return res.status(404).json({ error: "Blog not found." });
            }
            res.status(200).json(blogFound);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Something went wrong." });
        }
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
