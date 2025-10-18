const { parseToken } = require("../utils/jwt");

module.exports = () => (req, res, next) => {
    const token = req.headers['authorization']; 

    if(token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (err) {
            return res.status(401).json({message: "Invalid token!"});
        }
    } 

    next();
}