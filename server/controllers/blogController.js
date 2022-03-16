const blogService = require("../services/blogService");
require("dotenv").config();

async function getAllBlogs(req, res, next) {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status = 200;
    res.json(blogs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBlogs,
};
