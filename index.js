const express = require("express");
var multer = require("multer");

// file upload folder
const UPLOAD_FOLDER = "uploads";

// multer works here
const upload = multer({
  dest: UPLOAD_FOLDER,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if(file.fieldname === 'avatar') {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg .png .jpeg format allowed!"));
      }
    } else if (file.fieldname === 'doc') {
      if (
        file.mimetype === "application/pdf"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .pdf format allowed!"));
      }
    } else {
      cb(new Error("These was an unknown error"))
    }
    
  },
});

const app = express();

app.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  (req, res) => {
    res.send("Hello, World");
  }
);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("These was an upload error");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("succedd");
  }
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
