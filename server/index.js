const express = require("express");
require("dotenv").config();
const routes = require("./routes");
const cors = require("cors");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

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
