// models/Blog.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true, trim: true, minlength: 5 },
        body: { type: String, required: true, trim: true, minlength: 10 },
        imageUrl: { type: String, trim: true }, // image is optional
        tags: {
            type: [String],
            validate: {
                validator: function (arr) {
                    return Array.isArray(arr) && arr.length > 0;
                },
                message: "A blog must have at least one tag.",
            },
            set: (tags) => tags.map((tag) => tag.trim().toLowerCase()),
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
