const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../../models/User');

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
    return res.render('auth/register', { title: 'Register', error: 'All fields are required.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('auth/register', { title: 'Register', error: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const role = email.toLowerCase() === config.get('adminEmail') ? 'admin' : 'user';

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    return res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('auth/login', { title: 'Login', error: 'All fields are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth/login', { title: 'Login', error: 'Invalid credentials.' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.render('auth/login', { title: 'Login', error: 'Invalid credentials.' });
    }

    req.session.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
