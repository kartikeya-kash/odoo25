const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const pool = require('./config/db');
const itemRoutes = require('./routes/item');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL database!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Unable to connect to MySQL database:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
