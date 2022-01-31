import { protectedUser } from '../users.utils';

export default {
    Mutation: {
        unfollowUser: protectedUser(async (_, { username }, { loggedInUser }) => {
            const user = await client.user.findUnique({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: 'Cannot find user',
                };
            }

            await client.user.update({
                where: { id: loggedInUser.id },
                data: { following: { disconnect: { username } } },
            });

            return {
                ok: true,
            };
        }),
    },
};
