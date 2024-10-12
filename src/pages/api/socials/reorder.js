import { getSession } from 'next-auth/react';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';

export default async function handler(req, res) {
    if (req.method !== 'PATCH') return res.status(405).end();

    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: 'Not authenticated' });

    await dataBaseConnection();
    const { socialLinks } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            { socialLinks },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });

        return res.status(200).json({
            data: user.socialLinks,
            success: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: 'Failed to reorder social links' });
    }
}
