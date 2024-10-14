import dataBaseConnection from '@/lib/database';
import User from '../../../models/userSchema';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await dataBaseConnection();

    const { email, password, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message,
            success: false,
        });
    }
}
