function requireUser(req, res, next) {
  if (!req.user) {
    res.send({
      name: 'User Error',
      message: 'You must be logged in to perform this action',
    });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.user) {
    if (!req.user.isAdmin) {
      res.send({
        name: 'Hacker Alert!',
        message: 'You must be an admin to perform this action.',
      });
    }
    next();
  } else {
    res.send({
      name: 'User Error',
      message: 'You must be logged in, and an admin to perform this action',
    });
  }
}

module.exports = {
  requireAdmin,
  requireUser,
};
