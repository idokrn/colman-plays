const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function showAuth(req,res){
    res.render("login.ejs")
}

async function signup (req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // Create new user
        await User.create(name, email, hashedPassword);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function login (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and send JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN , { expiresIn: '1h' });

        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {showAuth, signup, login}