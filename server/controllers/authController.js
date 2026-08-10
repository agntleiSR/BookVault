const { sql } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
    try {
        const {
            fullName,
            username,
            email,
            password
        } = req.body;

        // Check required fields
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Check if username or email already exists
        const existingUser = await sql.query`
            SELECT UserId, Username, Email
            FROM Users
            WHERE Username = ${username}
               OR Email = ${email}
        `;

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                message: "Username or email already exists."
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert user
        await sql.query`
            INSERT INTO Users
                (FullName, Username, Email, PasswordHash)
            VALUES
                (${fullName}, ${username}, ${email}, ${passwordHash})
        `;

        res.status(201).json({
            message: "Account created successfully."
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            message: "Server error during registration."
        });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required."
            });
        }

        // Find user
        const result = await sql.query`
            SELECT
                UserId,
                FullName,
                Username,
                Email,
                PasswordHash
            FROM Users
            WHERE Username = ${username}
        `;

        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

        const user = result.recordset[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user.UserId,
                username: user.Username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful.",
            token,
            user: {
                userId: user.UserId,
                fullName: user.FullName,
                username: user.Username,
                email: user.Email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error during login."
        });
    }
};


module.exports = {
    register,
    login
};