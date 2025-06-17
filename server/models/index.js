const sequelize = require("../config/database");

const { User, Listing, Application, Interest } = require("./associations"); // 👈 use this

const db = {
  sequelize,
  User,
  Listing,
  Application,
  Interest,
};

module.exports = db;
