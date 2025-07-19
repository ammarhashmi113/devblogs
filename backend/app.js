const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// Connect with DB and serve API
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");

        // Start server after DB is connected
        app.listen(process.env.PORT, () => {
            console.log(`Devlog API is Listening on Port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error", err);
    });

app.get("/", (req, res) => {
    res.send("Hello Devs");
});
