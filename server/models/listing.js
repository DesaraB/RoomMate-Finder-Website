// models/Listing.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Listing = sequelize.define("Listing", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bathrooms: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false
  },
  property_type: {
    type: DataTypes.ENUM('apartment', 'house', 'condo', 'studio'),
    allowNull: false
  },
  amenities: {
    type: DataTypes.STRING,
    allowNull: true
  },
  available_from: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lease_term: {
    type: DataTypes.STRING,
    allowNull: true
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Define relationship with User (provider)
Listing.belongsTo(User, { foreignKey: 'provider_id', as: 'provider' });
User.hasMany(Listing, { foreignKey: 'provider_id' });

module.exports = Listing;