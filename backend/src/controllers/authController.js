const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// 📌 Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, bloodType, city, contact } = req.body;

        // ✅ Validate all required fields
        if (!name || !email || !password || !bloodType || !city || !contact) {
            return res.status(400).json({ message: "⚠️ All fields are required!" });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "⚠️ User already exists!" });
        }

        // ✅ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            bloodType,
            city,
            contact
        });

        console.log("✅ New user registered:", user);

        res.status(201).json({ message: "🎉 User registered successfully!", user });
    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        res.status(500).json({ message: "⚠️ Server error, please try again later." });
    }
};

// 📌 Login an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "⚠️ Email and password are required!" });
        }

        // ✅ Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log("❌ Login failed: No user found with email", email);
            return res.status(401).json({ message: "⚠️ Invalid email or password!" });
        }

        // ✅ Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Login failed: Password mismatch for", email);
            return res.status(401).json({ message: "⚠️ Invalid email or password!" });
        }

        // ✅ Generate JWT token
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env file!");
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log("✅ Login successful for:", email);

        res.json({ message: "🎉 Login successful!", token });
    } catch (error) {
        console.error("❌ Login Error:", error.message);
        res.status(500).json({ message: "⚠️ Server error, please try again later." });
    }
};
