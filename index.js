require('dotenv').config();
const express = require('express');
const connectDB = require('./database');
const userRoutes = require('./routes/userroutes');
const blogRoutes = require('./routes/blogroutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
