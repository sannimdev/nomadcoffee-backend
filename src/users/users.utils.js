import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
    try {
        const SECRET_KEY = process.env.SECRET_KEY;
        if (!token) {
            return null;
        }
        const { id: userId } = jwt.verify(token, SECRET_KEY);
        if (userId) {
            const user = await client.user.findUnique({ where: { id: userId } });
            return user;
        }
    } catch (error) {
        console.error('getUser:', error);
        return null;
    }
};

export const protectedUser = (resolver) => {
    return (root, args, context, info) => {
        if (!context.loggedInUser) {
            const query = info.operation.operation === 'query';
            if (query) {
                // return type이 Mutation과 다름.
                return null;
            }
            return {
                ok: false,
                error: 'Please log in to perform this action.',
            };
        }
        return resolver(root, args, context, info);
    };
};
