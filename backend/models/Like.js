// models/Like.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    },
    { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
