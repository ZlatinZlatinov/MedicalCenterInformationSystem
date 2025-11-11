function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please login!' });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are already logged in!' });
        } else {
            next();
        }
    }
}

function isDoctor() {
    return (req, res, next) => {
        if (req.user && req.user.role === 'doctor') {
            next();
        } else {
            res.status(401).json({ message: 'You are not authorized!' });
        }
    }
}

function isAdmin() {
    return (req, res, next) => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({ message: 'You are not authorized!' });
        }
    }
}

module.exports = {
    hasUser,
    isGuest,
    isAdmin,
    isDoctor
}