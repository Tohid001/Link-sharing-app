import { verify } from 'jsonwebtoken';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET;

// Enable parsing form data
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();

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

        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: 'Error parsing form data' });
            }

            const { firstName, lastName, email } = fields; // Extract text fields
            const file = files.avatar; // Adjust this based on your form field name

            let avatarUrl = null;

            if (file && file[0]) {
                const { name, size, type, filepath } = file[0];
                const uploadDir = path.join(process.cwd(), 'public/assets');
                const filePath = path.join(uploadDir, name);

                // Move the file to the assets folder
                await fs.promises.rename(filepath, filePath);

                // Construct the URL to save in MongoDB
                avatarUrl = `/assets/${name}`;
            }

            const updateFields = {
                firstName,
                lastName,
                email,
                avatar: avatarUrl,
            };

            const user = await User.findByIdAndUpdate(
                decoded.userId,
                updateFields,
                {
                    new: true,
                    runValidators: true,
                }
            );

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
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}
