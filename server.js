const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const initPassport = require('./config/passport');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');

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

app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'homepage.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/info', (req, res) => res.sendFile(path.join(__dirname, 'views', 'info.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, 'views', 'faq.html')));
app.get('/grocerylist', (req, res) => 
  res.sendFile(path.join(__dirname, 'views', 'grocerylist.html'))
);


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/meals', mealRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
