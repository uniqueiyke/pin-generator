const jwt = require('jsonwebtoken');
const User = require('../../models/user');

async function userAuth(req, res, next) {
    const token = req.header('x-auth-token');
    
    //Check for token
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);

        //confirm that there is such user in the database
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({message: 'No token, authorization denied'});
        }
        //Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
    console.log('token rerror', e);

        res.status(400).json({message: 'Token not valid'});
    }
}

module.exports = userAuth;