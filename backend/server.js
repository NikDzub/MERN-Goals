const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');

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

//serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('not in prod');
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
