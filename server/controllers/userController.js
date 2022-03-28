const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
require("dotenv").config();

let refreshTokens = [];

async function loginUser(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userService.authenticateUser(email, password);
    if (user) {
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log("jwt frm logon", accessToken);
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET
      );
      refreshTokens.push(refreshToken);

      res.json({
        accessToken: accessToken,
        user: { id: user.id, username: user.username, email: user.email },
      });
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
        })
        .send();
    } else {
      res.json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
}

async function registerUser(req, res, next) {
  try {
    const id = uuidv4();
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      id: id,
      username: username,
      email: email,
      password: hashedPassword,
    };

    await userService.insertUser(user);
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log("jwt frm register", accessToken);
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.json({
      accessToken: accessToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  loginUser,
  registerUser,
  refreshTokens,
};
