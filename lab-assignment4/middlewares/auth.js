module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session && req.session.user) return next();
    req.flash('error', 'Please log in to continue.');
    return res.redirect('/auth/login');
  },
  isAdmin: (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') return next();
    req.flash('error', 'Access denied. Admin only.');
    return res.redirect('/');
  }
};
