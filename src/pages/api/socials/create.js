import { verify } from 'jsonwebtoken';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, JWT_SECRET);
        if (!decoded?.userId) {
            return res.status(401).json({ error: 'Invalid Token' });
        }

        await dataBaseConnection();
        const { links } = req.body;

        if (!Array.isArray(links)) {
            return res.status(400).json({ error: 'Invalid input format' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.socialLinks = links;
        await user.save();

        return res.status(200).json({
            data: user.socialLinks,
            success: true,
        });
    } catch (error) {
        console.error('Error:', error);
        return res
            .status(500)
            .json({ error: `Internal Server Error(${error.message})` });
    }
}
