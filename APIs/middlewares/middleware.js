const ValidateUserCreation = (req, res, next) => {
    if (!req.body.username || !req.body.username.trim()) {
        return res.status(400).json({
            error: 'Please provide both a username'
        });
    }

    if (!req.body.password || !req.body.password.trim()) {
        return res.status(400).json({
            error: 'Please provide both a password'
        });
    }

    next();
}

module.exports = {
    ValidateUserCreation
}