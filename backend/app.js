const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./models/Blog");
require("dotenv").config();

console.log("PROCESS ENV-------------------------", process.env);

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

app.get("/", (req, res) => {
    res.send("Hello Devs");
});

// GET all Blog posts
app.get("/api/posts", async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.json(allBlogs);
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});
