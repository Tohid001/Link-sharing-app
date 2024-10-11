import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ message: 'Method not allowed', success: false });
    }

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res
            .status(400)
            .json({ message: 'Refresh token is required', success: false });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
            expiresIn: '15m',
        });

        res.status(200).json({ data: { accessToken }, success: true });
    } catch (error) {
        res.status(401).json({
            message: 'Invalid refresh token',
            success: false,
        });
    }
}
