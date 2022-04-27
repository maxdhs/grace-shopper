function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  console.log(req.user);
  if (!req.user.isAdmin) {
    res.status(401);
    next({
      name: "AdminUserError",
      message: "You must be an admin to perform this action",
    });
  }
  next();
}

module.exports = { requireUser, requireAdmin };
