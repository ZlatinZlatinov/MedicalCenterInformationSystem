const { parseToken } = require("../utils/jwt");

module.exports = () => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            const payload = parseToken(token);

            req.user = payload;
            req.token = token;
        } catch (err) {
            return res.status(401).json({ message: "Invalid token!" });
        }
    }

    next();
}