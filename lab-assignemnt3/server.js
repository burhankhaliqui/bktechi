const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const config = require('config');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const globalMiddleware = require('./middlewares/global');
const { isAdmin, isLoggedIn } = require('./middlewares/auth');
const productsRoute = require('./routes/products');
const authRoutes = require('./routes/auth/index');
const checkoutRoute = require('./routes/checkout');
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
  secret: 'lab-assignment-3-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI })
}));
app.use(flash());

// Global middleware (loads categories into res.locals)
app.use(globalMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
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
app.use('/checkout', isLoggedIn, checkoutRoute);
app.use('/', productsRoute);

// Admin routes (basic key-based auth)
app.use('/admin', isAdmin, adminIndexRoute);
app.use('/admin/products', isAdmin, adminProductsRoute);

// 404
app.use((req, res) => res.status(404).send('<h2>404 – Page Not Found</h2>'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
