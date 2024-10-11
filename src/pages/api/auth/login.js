import dataBaseConnection from '@/lib/database';
import User from '../../../models/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await dataBaseConnection();

    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            //dont say invalid emailor password, as it will alert the hacker what has went wrong
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            //dont say invalid emailor password, as it will alert the hacker what has went wrong
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '15m',
        });
        const refreshToken = jwt.sign(
            { userId: user._id },
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                accessToken,
                refreshToken,
            },
            message: 'logged in successfully',
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            success: false,
            error: error.message,
        });
    }
}
