const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Home = require('./Home');

const Interest = sequelize.define('Interest', {
  message: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'interests',
  timestamps: false
});

// Define associations
Interest.belongsTo(Home, { foreignKey: 'home_id' });
Interest.belongsTo(User, { foreignKey: 'seeker_id' });

module.exports = Interest;
