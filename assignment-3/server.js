const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const config = require('config');
const path = require('path');

const globalMiddleware = require('./middlewares/global');
const productsRoute = require('./routes/products');

const app = express();
const PORT = config.get('port');
const MONGO_URI = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// EJS + Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Global middleware (loads categories into res.locals)
app.use(globalMiddleware);

// Routes
app.get('/', (req, res) => res.render('index', { title: 'Apple Store – Home' }));
app.use('/', productsRoute);

// 404
app.use((req, res) => res.status(404).send('<h2>404 – Page Not Found</h2>'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
