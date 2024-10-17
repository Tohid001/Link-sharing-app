import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import dataBaseConnection from '@/lib/database';
import User from '../../../models/userSchema';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

async function refreshAccessToken(token) {
    try {
        const { userId } = jwt.verify(token.refreshToken, JWT_REFRESH_SECRET);

        // Issue a new access token and refresh token
        const newAccessToken = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: '15m',
        });
        const newRefreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });

        return {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
        };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return { ...token, error: 'RefreshTokenError' };
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'email@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await dataBaseConnection();

                const user = await User.findOne({ email: credentials.email });

                if (
                    !user ||
                    !(await bcrypt.compare(credentials.password, user.password))
                ) {
                    throw new Error('Invalid credentials');
                }

                const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
                    expiresIn: '15m',
                });
                const refreshToken = jwt.sign(
                    { userId: user._id },
                    JWT_REFRESH_SECRET,
                    { expiresIn: '7d' }
                );

                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: user.avatar,
                    accessToken,
                    refreshToken,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        avatar: user.avatar,
                    },
                };
            }

            // Access token has expired, attempt to refresh it
            if (Date.now() > token.accessTokenExpires) {
                return await refreshAccessToken(token);
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.error = token.error;
            session.user = token.user;
            return session;
        },
    },
};

export default NextAuth(authOptions);
