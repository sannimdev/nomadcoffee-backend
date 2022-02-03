import bcrypt from 'bcrypt';
import client from '../../client';

export default {
    Mutation: {
        createUser: async (
            _,
            { username, email, name, location, password, avatarURL, githubUsername }
        ) => {
            try {
                const existedUser = await client.user.findFirst({
                    where: {
                        OR: [{ username }, { email }],
                    },
                });
                if (existedUser) {
                    throw new Error('The username or email is already taken.');
                }
                const encryptedPassword = await bcrypt.hash(password, 10);
                await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        password: encryptedPassword,
                        avatarURL,
                        githubUsername,
                    },
                });
                return {
                    ok: true,
                };
            } catch (error) {
                return {
                    ok: false,
                    error,
                };
            }
        },
    },
};
