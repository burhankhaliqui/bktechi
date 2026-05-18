const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const config = require('config');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const globalMiddleware = require('./middlewares/global');
const { ensureAdmin } = require('./middlewares/auth');
const productsRoute = require('./routes/products');
const authRoutes = require('./routes/auth/index');
const adminIndexRoute = require('./routes/admin/index');
const adminProductsRoute = require('./routes/admin/products');

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
app.use(cookieParser());
app.use(session({
  secret: 'assignment-4-secret',
  resave: false,
  saveUninitialized: false
}));

// Global middleware (loads categories into res.locals)
app.use(globalMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Admin layout for admin area
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'admin-layout';
  next();
});

// Routes
app.get('/', (req, res) => res.render('index', { title: 'Apple Store – Home' }));
app.use('/auth', authRoutes);
app.use('/', productsRoute);

// Admin routes (basic key-based auth)
app.use('/admin', ensureAdmin, adminIndexRoute);
app.use('/admin/products', ensureAdmin, adminProductsRoute);

// 404
app.use((req, res) => res.status(404).send('<h2>404 – Page Not Found</h2>'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
