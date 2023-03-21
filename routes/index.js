const r = require("express").Router();
const multer = require("multer");
const PictureConntroller = require("../controller/PictureController");

const upload = multer();
// respond with "hello world" when a GET request is made to the homepage
r.get("/get", PictureConntroller.Get);
r.post("/upload", upload.single("file"), PictureConntroller.Post);
r.patch("/update", upload.single("file"), PictureConntroller.Update);

module.exports = r;
