const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/users/login", userController.loginUser);

router.post("/users/register", userController.registerUser);

router.get("/blogs", authMiddleware, blogController.getAllBlogs);

module.exports = router;
