import jwt from 'jsonwebtoken';
import AppError from '../utils/error.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';


const userAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({error: "Authentication credentials were not provied"});
    }

    let decoded;

    jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
        decoded = { ...dec };
        // console.log('decoded', decoded);
        if (err) {
            return next(err);
        }
    });

    const user = await User.findById(decoded.id);
    // console.log('user', user);

    if (!user) {
        return res.status(401).json({error: "The user does not exist"});
    }
   
    // const isMatch = await bcrypt.compare(decoded.password, user.password);
    // if (!isMatch)
    //     return res.status(401).json({error: "User changed password! please login again"});

    req.user = { email: decoded.username, id: decoded.id };

    next();
};

export default userAuth;