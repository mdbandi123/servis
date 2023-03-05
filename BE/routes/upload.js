const multer = require("multer");
const express = require("express");
const route = express();
const auth = require("../middlewares/auth");

const menu_model = require("../models/menu").menu_model;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });

// uploads an image to the local folder and updates the image url in the menu_item collection
route.post("/", upload.single("file"), (req, res) => {
    console.log("File received and saved to local folder");
    console.log(req.file);
    const imageUrl = `/images/${req.file.filename}`;

    res.send({imageUrl: imageUrl});
  });

module.exports = route;