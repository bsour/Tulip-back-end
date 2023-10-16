const express = require("express");

const routes = require("./routes/index");

const tulip = express();
const port = 1245;

tulip.use("/", routes);

tulip.listen(port, () => {
  console.log(`Listening on port${port}`);
});

module.exports = tulip;
