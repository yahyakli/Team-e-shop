import jwt from 'jsonwebtoken';


function checkToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ status: 'error', message: 'No token provided.' });
    }

    // Verify token
    jwt.verify(token, 'secret123', (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'error', message: 'Failed to authenticate token.' });
        }

        // Save decoded info to request for use in other routes
        req.user = decoded;
        next();
    });
}

export default checkToken;