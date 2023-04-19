require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
// we can replace this with body parser
// this is the moder way
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/notes', notesRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
