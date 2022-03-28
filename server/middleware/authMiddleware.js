const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(1);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(2);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authorization failed",
    });
  }
};
