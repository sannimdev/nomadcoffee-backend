import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            try {
                const getLoginResult = (ok = false, error = null, token = null) => ({
                    ok,
                    error,
                    token,
                });
                const user = await client.user.findFirst({ where: { username } });
                if (!user) {
                    return getLoginResult(false, 'Not found username');
                }
                const isVerified = await bcrypt.compare(password, user.password);
                if (!isVerified) {
                    return getLoginResult(false, 'Incorrect Password');
                }
                const SECRET_KEY = process.env.SECRET_KEY;
                const token = jwt.sign({ id: user.id }, SECRET_KEY);
                return getLoginResult(true, null, token);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
