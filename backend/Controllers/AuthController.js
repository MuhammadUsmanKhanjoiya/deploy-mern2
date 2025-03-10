const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can log in.',
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user model
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: 'Signup successful',
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'Auth failed: email or password is incorrect.',
                success: false
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({
                message: 'Auth failed: email or password is incorrect.',
                success: false
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login success',
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
