const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../s3");

// Route for retrieving an image by its key
imageRouter.get("/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

//  Route for uploading an image
imageRouter.post("/", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  const result = await uploadFile(file);
  await unlinkFile(file.path); // Deleting the temporary file on the server upon successful upload
  console.log(result);
  const description = req.body.description;
  res.send({ photo_url: result.Location });
});

module.exports = imageRouter;
