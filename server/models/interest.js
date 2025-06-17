// ✅ Sequelize model: models/Interest.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Interest = sequelize.define("Interest", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  seeker_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  listing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "interests",
  timestamps: true,
});

module.exports = Interest;
