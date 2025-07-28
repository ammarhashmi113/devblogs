// middlewares/blogWithIdExists.js

const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const blogWithIdExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // making sure that invalid mongoose object id is not queried, for example and id of "abc"
    if (!mongoose.isValidObjectId(id)) {
        return next(new AppError("Invalid blog id format", 400));
    }
    // throwing error if blog with the given (valid mongoose object) id is not found
    const blog = await Blog.findById(id);
    if (!blog) {
        return next(new AppError("Blog with the given id was not found.", 404));
    }
    req.blog = blog; // attaching blog to request object because we will need it in route handlers.
    next();
});

module.exports = blogWithIdExists;
