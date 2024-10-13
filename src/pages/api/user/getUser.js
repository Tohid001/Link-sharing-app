import { verify } from 'jsonwebtoken';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, JWT_SECRET);

        await dataBaseConnection();

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({
            data: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
            },
            success: true,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}
