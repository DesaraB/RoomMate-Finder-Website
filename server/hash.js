const bcrypt = require("bcryptjs");

bcrypt.hash("password1", 10).then((hashedPassword) => {
  console.log("Hashed password:", hashedPassword);
});