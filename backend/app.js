const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Blog = require("./models/Blog");
require("dotenv").config();

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

// GET all blogposts
app.get("/api/posts", async (req, res) => {
    try {
        const allBlogs = await Blog.find({});
        res.status(200).json(allBlogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
});

// GET a single blogpost from id
app.get("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const blogFound = await Blog.findById(id);
        if (!blogFound) {
            return res.status(404).json({ error: "Blog not found." });
        }
        res.status(200).json(blogFound);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
});
