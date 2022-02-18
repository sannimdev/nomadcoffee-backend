import client from '../../client';
import { protectedUser } from '../users.utils';

export default {
    Query: {
        me: protectedUser(async (_, __, { loggedInUser }) =>
            client.user.findUnique({ where: { id: loggedInUser.id } })
        ),
    },
};
