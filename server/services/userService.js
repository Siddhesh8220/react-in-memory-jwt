const bcrypt = require("bcrypt");

users = [];
let refreshTokens = [];

async function authenticateUser(email, password) {
  const user = users.find((user) => {
    return user.email == email;
  });
  if (user) {
    valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

async function insertUser(user) {
  users.push(user);
  return user;
}

module.exports = {
  authenticateUser,
  insertUser,
};
