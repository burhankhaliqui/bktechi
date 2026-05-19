const config = require('config');

module.exports = (req, res, next) => {
  const key = req.get('x-admin-key') || req.query.key;
  const expected = config.get('adminKey');

  if (key && key === expected) {
    return next();
  }

  return res.status(403).send('Forbidden: Admin access required');
};
