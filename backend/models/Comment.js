// models/Comment.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
        body: { type: String, required: true },
    },
    { timestamps: true }
);
