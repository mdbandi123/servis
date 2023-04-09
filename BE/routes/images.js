const path = require("path");
const express = require("express");

const route = express();

// get the image from the local folder
route.get("/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);
    res.sendFile(imagePath);
});

module.exports = route;