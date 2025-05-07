const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const initPassport = require('./config/passport');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.connect("mongodb://localhost:27017/nutriplan")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'nutriplan_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));