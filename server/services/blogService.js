const { v4: uuidv4 } = require("uuid");

let blogs = [
  {
    id: 1,
    title: "React Hooks",
    text: "hello",
    author: "siddhesh",
  },
  {
    id: 2,
    title: "test",
    text: "hello",
    author: "siddhesh",
  },
  {
    id: 3,
    title: "test",
    text: "hello",
    author: "siddhesh",
  },
  {
    id: 4,
    title: "test",
    text: "hello",
    author: "siddhesh",
  },
];

async function getAllBlogs() {
  return blogs;
}

module.exports = {
  getAllBlogs,
};
