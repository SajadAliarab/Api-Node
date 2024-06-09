const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.json({message: 'Not authenticated!'});
        }
        const decodedToken = jwt.verify(token, 'secret_token');
        req.userData = {userId: decodedToken.userId};
        next();
    } catch (error) {
        return res.json({message: 'Not authenticated!'});
    }
}