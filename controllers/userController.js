import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function userRegister(req, res) {
    try {
        const { fullname , email ,  password } = req.body;
        const user = await User.find({ email: email });
        if (user.length > 0) {
            return res.status(409).json({ message: "user already exists. ", success: false });
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname ,
            email ,
            password: passwordHash,
            workspaces: []
        });
        const savedUser = await newUser.save();
        if (savedUser) {
            const { password: _password, ...userWithoutPassword } = savedUser.toObject();

            return res.status(201).json({
                message: "User saved successfully",
                success: true,
                user: userWithoutPassword
            });
        }
        return res.status(400).json({ message: "Failed to save user", success: false, savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log('user', user);
        if (!user) return res.status(401).json({ message: "user does not exist. ", success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong Password. ", success: false });
        const token = jwt.sign({ id: user._id, username }, process.env.SECRET_KEY); // Removed password from token payload for security

        // Convert the user document to a plain JavaScript object and delete the password
        const userObject = user.toObject();
        delete userObject.password;

        res.status(200).json({ token, user: userObject, success: true }); // Send the modified user object without the password
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}