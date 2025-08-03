// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true, minLength: 5, trim: true },
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
            trim: true,
            match: [/.+@.+\..+/, "Invalid email format."],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            validate: {
                validator: function (v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
                        v
                    );
                },
                message:
                    "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
            },
        },
        role: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        about: {
            type: String,
            maxlength: 500,
        },
        imageUrl: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Using mongoose pre-save middleware to clean some values, add default imageUrl, and hash the entered password before saving
userSchema.pre("save", async function (next) {
    // Trim + clean spaces
    if (this.name) {
        this.name = this.name.trim().replace(/\s+/g, " ");
    }
    if (this.role) {
        this.role = this.role.trim().replace(/\s+/g, " ");
    }

    // Set default imageUrl if not provided
    if (!this.imageUrl && this.name) {
        const encodedName = encodeURIComponent(this.name); // encodeURIComponent(this.name) avoids breaking images if someone has weird characters in their name
        this.imageUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random`;
    }

    // Only hash if password was changed or is new
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

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
