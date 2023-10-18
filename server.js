const express = require("express");

const mongoose = require("mongoose");

const routes = require("./routes/index");
const e = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://TulipAdmin:gkTnCQI5eaXj7Y7g@cluster0.hrj1rwg.mongodb.net/Tulip-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`app API is running on port: ${port}`);
    });
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
