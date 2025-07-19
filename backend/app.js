const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello Devs");
});

app.listen(port, () => {
    console.log(`Devlog API is Listening on Port 3000`);
});
