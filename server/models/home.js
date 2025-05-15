const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Home = sequelize.define('Home', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2),
  bedrooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  property_type: {
    type: DataTypes.ENUM('apartment', 'house', 'condo', 'studio')
  },
  available_from: DataTypes.DATE,
  lease_term: DataTypes.STRING,
  amenities: DataTypes.TEXT,
  photo_url: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'homes',
  timestamps: false
});

// Define association
Home.belongsTo(User, { foreignKey: 'provider_id' });

module.exports = Home;
