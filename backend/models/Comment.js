// models/Comment.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        // author
        blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
        body: { type: String, required: true },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
