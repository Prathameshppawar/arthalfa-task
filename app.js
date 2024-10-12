const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./models');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', productRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
