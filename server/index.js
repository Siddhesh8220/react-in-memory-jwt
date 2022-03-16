const express = require("express");
require("dotenv").config();
const routes = require("./routes");
const cors = require("cors");
var morgan = require("morgan");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

const port = process.env.PORT || 8000;

app.use("/", routes);

app.use(function (err, req, res, next) {
  res.status(500);
  console.log(err);
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
