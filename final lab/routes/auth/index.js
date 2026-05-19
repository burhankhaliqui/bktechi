const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../../models/User');
const { isLoggedIn } = require('../../middlewares/auth');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    req.flash('error', 'All fields are required.');
    return res.redirect('/auth/register');
  }
  if (password.length < 6) {
    req.flash('error', 'Password must be at least 6 characters.');
    return res.redirect('/auth/register');
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      req.flash('error', 'Email already registered.');
      return res.redirect('/auth/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const role = email.toLowerCase() === config.get('adminEmail') ? 'admin' : 'customer';

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    req.flash('success', 'Registration successful. Please log in.');
    return res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'All fields are required.');
    return res.redirect('/auth/login');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/auth/login');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/auth/login');
    }

    if (user.email.toLowerCase() === config.get('adminEmail') && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    const returnTo = req.session.returnTo || '/';
    delete req.session.returnTo;

    req.session.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
    req.flash('success', `Welcome back, ${user.name}!`);
    return res.redirect(returnTo);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  req.session.cart = [];
  req.flash('success', 'You have successfully logged out.');
  req.session.save(() => res.redirect('/'));
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('auth/profile', { title: 'My Profile', user: req.session.user });
});

module.exports = router;
