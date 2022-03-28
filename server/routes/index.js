const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

router.post("/token", (req, res) => {
  const refreshTokens = userController.refreshTokens;
  const refreshToken = req.cookies["refreshToken"];
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    console.log("jwt frm /token", accessToken);
    res.json({ accessToken: accessToken, user: { email: user.email } });
  });
});

router.post("/users/login", userController.loginUser);

router.post("/users/register", userController.registerUser);

router.get("/blogs", authMiddleware, blogController.getAllBlogs);

module.exports = router;
