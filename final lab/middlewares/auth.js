module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session && req.session.user) return next();
    if (req.method === 'GET') {
      req.session.returnTo = req.originalUrl;
    }
    req.flash('error', 'Please log in to continue.');
    return res.redirect('/auth/login');
  },
  isAdmin: (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') return next();
    if (!req.session || !req.session.user) {
      req.flash('error', 'Please log in as admin to continue.');
      return res.redirect('/auth/login');
    }
    req.flash('error', 'Access denied. Admin only.');
    return res.redirect('/');
  }
};
