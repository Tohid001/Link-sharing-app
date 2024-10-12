import { getSession } from 'next-auth/react';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const session = await getSession({ req });
        if (!session)
            return res.status(401).json({ error: 'Not authenticated' });
        await dataBaseConnection();
        try {
            const userId = session.user.id;
            const user = await User.findById(userId).select('socialLinks');
            res.status(200).json({
                data: user.socialLinks || [],
                success: true,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching social links' });
        }
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
