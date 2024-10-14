import { verify } from 'jsonwebtoken';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const { userId } = req.query;

    try {
        let decoded;
        if (!userId) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res
                    .status(401)
                    .json({ error: 'Missing or invalid Authorization header' });
            }
            const token = authHeader.split(' ')[1];
            decoded = verify(token, JWT_SECRET);
            if (!decoded?.userId) {
                return res.status(401).json({ error: 'Invalid Token' });
            }
        }

        await dataBaseConnection();

        const user = await User.findById(userId || decoded.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({
            data: user?.socialLinks || [],
            success: true,
        });
    } catch (error) {
        console.error('Error:', error);
        return res
            .status(500)
            .json({ error: `Internal Server Error(${error.message})` });
    }
}
