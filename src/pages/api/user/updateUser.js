import { verify } from 'jsonwebtoken';
import { IncomingForm } from 'formidable';
import User from '../../../models/userSchema';
import dataBaseConnection from '@/lib/database';
import cloudinary from '@/lib/cloudinary';

const JWT_SECRET = process.env.JWT_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

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

        const form = new IncomingForm();

        const formParse = () =>
            new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ fields, files });
                    }
                });
            });

        const { fields, files } = await formParse();

        const { firstName, lastName, email } = fields;
        const avatar = files.avatar;

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields only if they are truthy
        if (firstName[0]) user.firstName = firstName[0];
        if (lastName[0]) user.lastName = lastName[0];
        if (email[0]) user.email = email[0];

        if (avatar && avatar.length > 0) {
            try {
                const avatarFile = avatar[0];
                const result = await cloudinary.uploader.upload(
                    avatarFile.filepath,
                    {
                        folder: 'avatars',
                        use_filename: true,
                        unique_filename: true,
                    }
                );

                if (user.avatar) {
                    const publicId = user.avatar.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`avatars/${publicId}`);
                }

                user.avatar = result.secure_url;
            } catch (uploadError) {
                return res.status(500).json({
                    error: 'File upload failed',
                    details: uploadError.message,
                });
            }
        }
        // else {
        //     return res.status(400).json({ error: 'Avatar file is missing' });
        // }

        // Only save if there are changes
        if (user.isModified()) {
            console.log('Parsed Files:', { fields, files, user });
            await user.save();
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(400).json({ error: 'No changes to update' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res
            .status(500)
            .json({ error: `Internal Server Error(${error.message})` });
    }
}
