const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
