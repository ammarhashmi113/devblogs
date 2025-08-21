const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const Blog = require("./models/Blog");
const Comment = require("./models/Comment");
const Like = require("./models/Like");
require("dotenv").config();
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/AppError");
const isAuthenticated = require("./middlewares/isAuthenticated");
const authOptional = require("./middlewares/authOptional");
const blogWithIdExists = require("./middlewares/blogWithIdExists");

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

// Configuring Cors
app.use(cors({ origin: "*", credentials: true }));

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

        const { name, username, email, password, role, imageUrl, about } =
            req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return next(new AppError("Email already registered", 400));
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return next(new AppError("Username already in use", 400));
        }

        const user = new User({
            name,
            username,
            email,
            password,
            role,
            about,
            imageUrl: imageUrl?.trim() || undefined, // fallback triggers pre-save default
        });
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            status: "success",
            token, // Send the JWT token to the client
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                imageUrl: user.imageUrl,
                createdAt: user.createdAt,
            },
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
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                imageUrl: user.imageUrl,
                createdAt: user.createdAt,
            },
        });
    })
);

// send logged in user data with the "me" route
app.get(
    "/api/me",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { _id, name, username, email, role, about, imageUrl, createdAt } =
            req.user; // skipping sensitive/irrelevant user data
        res.status(200).json({
            user: {
                _id,
                name,
                username,
                email,
                role,
                about,
                imageUrl,
                createdAt,
            },
        });
    })
);

// update a user
app.put(
    "/api/me",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { name, username, about, imageUrl, role } = req.body;
        const user = req.user;

        // Username uniqueness check (only if username is changing)
        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return next(new AppError("Username already taken", 400));
            }
            user.username = username;
        }

        // Update allowed fields
        if (name) user.name = name;
        if (about) user.about = about;
        if (imageUrl) user.imageUrl = imageUrl;
        if (role) user.role = role;

        await user.save();

        const { _id, email, createdAt } = user;

        res.status(200).json({
            status: "success",
            user: {
                _id,
                name: user.name,
                username: user.username,
                email, // included for frontend display, not updatable
                role: user.role,
                about: user.about,
                imageUrl: user.imageUrl,
                createdAt,
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
    catchAsync(async (req, res) => {
        console.log("GET BLOGPOSTS REQUEST WAS MADE");
        const limit = parseInt(req.query.limit) || 0; // 0 = no limit
        const allBlogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate({
                path: "author",
                select: "username name role about imageUrl",
            });
        res.status(200).json({ status: "success", data: { blogs: allBlogs } });
    })
);

// GET a single blogpost from id
app.get(
    "/api/posts/:id",
    authOptional,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const blog = await Blog.findById(id)
            .populate({
                path: "author",
                select: "username name role about imageUrl",
            })
            .populate({
                path: "likes",
                select: "author createdAt",
                populate: { path: "author", select: "username" },
            });

        if (!blog) {
            return next(new AppError("Blog not found", 404));
        }

        // Did current user like this blog?
        const likedByUser = blog.likes.some((like) =>
            like.author.equals(req.user?._id)
        );

        res.status(200).json({
            status: "success",
            data: { blog, likedByUser },
        });
    })
);

// POST a blogpost (authenticated user)
app.post(
    "/api/posts",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        const author = req.user._id; // logged in user is attached to request object in isAuthenticated middleware
        const { title, body, imageUrl, category, tags } = req.body; // from request sent from client

        // Checking if a blog with same title exists
        const blogWithSameNameFound = await Blog.findOne({
            title: new RegExp(`^${title.trim()}$`, "i"), // case insensitive check for title
        });

        if (blogWithSameNameFound) {
            return next(
                new AppError("Blog with this title already exists.", 409)
            );
        }

        // Validate if blog tags (tags should be an array and there should be atleast one tag in the array)
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return next(new AppError("Please provide at least one tag.", 400));
        }

        // Cleaning and normalizing the tags
        const cleanedTags = tags.map((tag) => tag.trim().toLowerCase());

        const blog = new Blog({
            author,
            title,
            body,
            imageUrl: imageUrl?.trim() || undefined, // fallback triggers pre-save default
            category,
            tags: cleanedTags,
        });
        await blog.save();

        res.status(201).json({
            status: "success",
            message: "Successfully created the blogpost.",
        });
    })
);

// Edit (PUT) a blogpost
app.put(
    "/api/posts/:id",
    isAuthenticated,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const blog = req.blog; // Blog is attached with request body in "blodWithIdExists" middleware
        const { id } = req.params;
        const { title, body, imageUrl, category, tags } = req.body;

        // Making sure only blog author can edit or delete it.
        if (!blog.author.equals(req.user._id)) {
            return next(
                new AppError(
                    "User is unauthorized for updating this blog.",
                    401
                )
            );
        }

        // Creating empty update object which will be populated
        const updateData = {};

        if (title) updateData.title = title.trim(); // using trim() in route because mongoose schema trim() doesnt run while using th function findByIdAndUpdate()
        if (body) updateData.body = body.trim();
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl.trim();
        if (category) updateData.category = category.trim();

        if (tags !== undefined) {
            if (!Array.isArray(tags) || tags.length === 0) {
                return next(
                    new AppError("Please provide at least one tag.", 400)
                );
            }
            updateData.tags = tags; // Schema will clean tags using `set` method
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: { blog: updatedBlog },
        });
    })
);

// Delete a blogpost
app.delete(
    "/api/posts/:id",
    isAuthenticated,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const blog = req.blog;

        // Making sure only blog author can edit or delete it.
        if (!blog.author.equals(req.user._id)) {
            return next(
                new AppError(
                    "User is unauthorized for deleting this blog.",
                    403
                )
            );
        }

        await blog.deleteOne();
        res.status(200).json({
            status: "success",
            message: "Blog deleted successfully.",
        });
    })
);

// Get all comments of a particular blogpost
app.get(
    "/api/posts/:id/comments",
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const blogComments = await Comment.find({ blog: id })
            .select("author body createdAt")
            .populate({
                path: "author",
                select: "username name role imageUrl",
            });
        res.status(200).json({
            status: "success",
            data: { comments: blogComments },
        });
    })
);

// Add a comment to a blogpost
app.post(
    "/api/posts/:id/comments",
    isAuthenticated,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const blog = req.blog;

        // we need to only get comment body from client.
        const { body } = req.body;

        const comment = new Comment({ author: req.user, blog: blog._id, body });
        blog.comments.push(comment._id);
        await comment.save();
        await blog.save();
        // populate author
        await comment.populate("author");
        res.status(201).json({
            status: "success",
            message: "Successfully added comment to the blogpost.",
        });
    })
);

// Remove a comment from a blogpost
app.delete(
    "/api/posts/:id/comments/:commentId",
    isAuthenticated,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const blog = req.blog;

        // Checking if comment witht he id exists
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(
                new AppError("Comment with the given id was not found.", 404)
            );
        }

        // Only allowing comment author to delete the comment
        if (!req.user.equals(comment.author)) {
            return next(
                new AppError("User is unauthorized to delete this comment", 403)
            );
        }

        // Make sure the comment belongs to the blog
        if (!comment.blog.equals(blog._id)) {
            return next(
                new AppError(
                    "Given comment is not attached to the given blog.",
                    404
                )
            );
        }

        // Delete the comment document
        await Comment.findByIdAndDelete(commentId);

        // Remove comment from comments array in blog (which hold comment model's reference)
        await Blog.findByIdAndUpdate(blog._id, {
            $pull: { comments: commentId },
        });

        res.status(200).json({
            status: "success",
            message: "Successfully deleted comment from the blogpost.",
        });
    })
);

// Add a like to a blogpost
app.post(
    "/api/posts/:id/likes",
    isAuthenticated,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const blog = req.blog;

        // Making sure that a user can only add one like to a blogpost
        const alreadyLiked = await Like.findOne({
            author: req.user,
            blog: blog._id,
        });
        if (alreadyLiked) {
            return next(
                new AppError(
                    "Like for this blog is already added by the user.",
                    403
                )
            );
        }

        // Making sure blog author cant add a like to their blogpost
        if (blog.author.equals(req.user._id)) {
            return next(
                new AppError("Blog author cannot like their own blogpost.", 403)
            );
        }

        const like = new Like({ author: req.user, blog: blog._id });
        blog.likes.push(like._id);

        await like.save();
        await blog.save();

        res.status(201).json({
            status: "message",
            message: "Successfully liked the blogpost.",
        });
    })
);

// Unlike a blogpost
app.delete(
    "/api/posts/:id/likes",
    isAuthenticated,
    blogWithIdExists,
    catchAsync(async (req, res, next) => {
        const blog = req.body;

        // First Check if current logged-in user has a like made for this particular blog
        const like = await Like.findOne({ author: req.user, blog: blog._id });
        if (!like) {
            return next(new AppError("The user has not liked this blog.", 404));
        }

        // Delete the like document
        await Like.findByIdAndDelete(like._id);

        // Remove like from likes array in blog (which hold Like model's reference)
        await Blog.findByIdAndUpdate(blog._id, { $pull: { likes: like._id } });

        res.status(200).json({
            status: "success",
            message: "Successfully unliked the blogpost.",
        });
    })
);

// Error handling middleware
app.use((err, req, res, next) => {
    let { message = "Something went wrong.", statusCode = 500 } = err;

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
