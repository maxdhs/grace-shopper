function requireUser(req, res, next) {
    if(!req.user) {
        res.send({
            name: "User Error",
            message: "You must be logged in to perform this action"
        })
    };
    next();
};

function requireAdmin(req, res, next) {
    if(!req.user.isAdmin) {
        res.send({
            name: "Hacker Alert!",
            message: "You must be an admin to perform this action."
        });
    } 
    next();
};

module.exports = {
    requireAdmin,
    requireUser
}