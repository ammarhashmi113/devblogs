// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Invalid email format."],
        },
        password: { type: String, required: true, minlength: 8, select: false },
    },
    { timestamps: true }
);

// Using mongoose pre-save middleware to hash the entered password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // password didnt change before saving
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Adding compare method on top of each instance of user model to help simply authenticating when logging in
userSchema.methods.comparePassword = async function (enteredPassword) {
    const passwordMatched = await bcrypt.compare(
        enteredPassword,
        this.password
    );
    return passwordMatched;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
