// models/Blog.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true, trim: true, minlength: 5 },
        body: { type: String, required: true, trim: true, minlength: 10 },
        imageUrl: { type: String, trim: true }, // image is optional, will fallback to default image if not provided
        category: {
            type: String,
            required: true,
            enum: [
                "javascript",
                "react",
                "nextjs",
                "nodejs",
                "express",
                "mongodb",
                "html",
                "css",
                "ui/ux",
                "tailwind",
                "devops",
                "testing",
                "ai",
                "ml",
                "data-science",
                "career",
                "other",
            ],
            lowercase: true,
            trim: true,
        },
        tags: {
            type: [String],
            validate: {
                validator: function (arr) {
                    return Array.isArray(arr) && arr.length > 0;
                },
                message: "A blog must have at least one tag.",
            },
            set: (tags) => tags.map((tag) => tag.trim().toLowerCase()), // cleaning and normalizing tags
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    },
    { timestamps: true }
);

// Using mongoose pre-save middleware to set default image to the blog upon save (if image is not provided)
blogSchema.pre("save", async function (next) {
    // Set default blog imageUrl if not provided
    if (!this.imageUrl) {
        this.imageUrl =
            "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?_gl=1*elp6w1*_ga*OTc0MTk3NjY4LjE3NTIwOTYxNzg.*_ga_8JE65Q40S6*czE3NTM5NzYyMjYkbzEyJGcxJHQxNzUzOTc2MzA5JGo0OCRsMCRoMA..";
    }
    next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
