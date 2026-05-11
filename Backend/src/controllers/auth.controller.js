import {
    createAuthToken,
    loginUser,
    registerUser
} from "../service/auth.service.js";
import User from "../models/user.schema.js";

function tokenCookieOptions() {
    return {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };
}

export default class AuthController {
    async register(req, res) {
        try {
            const user = await registerUser(req.body);
            const token = createAuthToken(user);

            res.cookie("token", token, tokenCookieOptions());
            return res.status(201).json({ success: true, data: { user, token } });
        } catch (error) {
            const statusCode = error.message === "Email is already registered" ? 409 : 400;
            return res.status(statusCode).json({ success: false, message: error.message });
        }
    }

    async login(req, res) {
        try {
            const user = await loginUser(req.body);
            const token = createAuthToken(user);

            res.cookie("token", token, tokenCookieOptions());
            return res.status(200).json({ success: true, data: { user, token } });
        } catch (error) {
            return res.status(401).json({ success: false, message: error.message });
        }
    }

    async me(req, res) {
        return res.status(200).json({ success: true, data: req.user });
    }

    async logout(req, res) {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({ success: true, message: "Logged out" });
    }

    // Admin-only: change a user's role
    async updateUserRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const validRoles = ["admin", "manager", "agent"];
            if (!role || !validRoles.includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: `role must be one of: ${validRoles.join(", ")}`
                });
            }

            const user = await User.findByIdAndUpdate(
                id,
                { $set: { role } },
                { returnDocument: 'after', runValidators: true }
            ).select("-password");

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // Admin-only: list all users
    async listUsers(req, res) {
        try {
            const users = await User.find()
                .select("-password")
                .sort({ createdAt: -1 })
                .lean();

            const sanitized = users.map((u) => ({
                id: u._id,
                name: u.name,
                email: u.email,
                role: u.role,
                createdAt: u.createdAt,
            }));

            return res.status(200).json({ success: true, data: sanitized });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

