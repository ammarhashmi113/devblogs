// models/Blog.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
        // author
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
