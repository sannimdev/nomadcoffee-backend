import client from '../../client';
import { protectedUser } from '../users.utils';

export default {
    Mutation: {
        followUser: protectedUser(async (_, { username }, { loggedInUser }) => {
            const user = await client.user.findUnique({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: 'Cannot find user',
                };
            }

            await client.user.update({
                where: { id: loggedInUser.id },
                data: { following: { connect: { username } } },
            });

            return {
                ok: true,
            };
        }),
    },
};
