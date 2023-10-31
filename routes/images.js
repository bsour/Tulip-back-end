const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../s3");

imageRouter.get("/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

imageRouter.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);
  
  const result = await uploadFile(file);
  await unlinkFile(file.path)
  console.log(result);
  const description = req.body.description;
  res.send({ imagePath: `/uploads/${result.Key}` });
});

module.exports = imageRouter;
