const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const User = require('./models/User');
const Home = require('./models/Home');
const Interest = require('./models/Interest');

// ⬇️ ADD THESE LINES TO IMPORT ROUTES
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const interestRoutes = require('./routes/interestRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// ⬇️ ADD ROUTE MIDDLEWARES
app.use('/api/users/', userRoutes);
app.use('/api/homes', homeRoutes);
app.use('/api/interests', interestRoutes);

// Sync models
sequelize.sync({ alter: true }) // change to { force: true } to reset tables
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
