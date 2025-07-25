const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/User");
const Blog = require("./models/Blog");
const Comment = require("./models/Comment");
require("dotenv").config();
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/AppError");
const isAuthenticated = require("./middlewares/isAuthenticated");

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
        res.status(200).json(allBlogs);
    })
);

// GET a single blogpost from id
app.get(
    "/api/posts/:id",
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const blogFound = await Blog.findById(id)
            .populate("author", "username")
            .populate({
                path: "comments",
                select: "author body createdAt",
                populate: { path: "author", select: "username" },
            });

        if (!blogFound) {
            return next(new AppError("Blog not found", 404));
        }
        res.status(200).json(blogFound);
    })
);

// POST a blogpost (authenticated user)
app.post(
    "/api/posts",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const author = req.user._id; // logged in user is attached to request object in isAuthenticated middleware
        const { title, body } = req.body; // from request sent from client

        // Checking if a blog with same title exists
        const blogWithSameNameFound = await Blog.findOne({
            title: new RegExp(`^${title.trim()}$`, "i"), // case insensitive check for title
        });

        if (blogWithSameNameFound) {
            return next(
                new AppError("Blog with this title already exists", 409)
            );
        }

        const blog = new Blog({ author, title, body });
        await blog.save();

        const populatedBlog = await blog.populate("author", "username");
        res.status(201).json(populatedBlog);
    })
);

// Edit (PUT) a blogpost
app.put(
    "/api/posts/:id",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { title, body } = req.body;
        const blogWithIdFound = await Blog.findOne({ _id: id });

        if (!blogWithIdFound) {
            return next(new AppError("Blog with given id not found", 404));
        }

        // Blog title and body must be provided (again) while updating, for now
        if (!title || !body) {
            return next(new AppError("Blog title and body are required", 400));
        }

        // Making sure only blog author can edit or delete it.
        if (!blogWithIdFound.author.equals(req.user._id)) {
            return next(new AppError("Unauthorized for editing the blog", 401));
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, body },
            { new: true }
        );
        res.status(200).json(updatedBlog);
    })
);

// Delete a blogpost
app.delete(
    "/api/posts/:id",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return next(new AppError("Blog with given id not found", 404));
        }

        // Making sure only blog author can edit or delete it.
        if (!blog.author.equals(req.user._id)) {
            return next(
                new AppError("Unauthorized for deleting the blog", 401)
            );
        }

        await blog.deleteOne();
        res.status(200).json({ message: "Blog deleted successfully" });
    })
);

// Add a comment to a blogpost
app.post(
    "/api/posts/:id/comments",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        // we need to only get comment body from client.
        const { body } = req.body;
        const blog = await Blog.findById(id);

        if (!blog) {
            return next(new AppError("Blog with given id not found", 404));
        }

        const comment = new Comment({ author: req.user, blog: blog._id, body });
        blog.comments.push(comment._id);
        await comment.save();
        await blog.save();
        // populate author
        await comment.populate("author");
        res.status(201).json({ comment });
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
