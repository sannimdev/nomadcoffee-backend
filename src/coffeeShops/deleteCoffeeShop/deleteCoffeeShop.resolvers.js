import client from '../../client';
import { protectedUser } from '../../users/users.utils';

export default {
    Mutation: {
        deleteCoffeeShop: protectedUser(async (_, { id }, { loggedInUser }) => {
            const shop = await client.coffeeShop.findUnique({ where: { id }, select: { userId: true } });
            if (!shop) {
                return { ok: false, error: 'The coffeeshop not found' };
            } else if (shop.userId !== loggedInUser.id) {
                return { ok: false, error: 'Not authorized' };
            } else {
                await client.coffeeShop.delete({ where: { id } });
                return { ok: true };
            }
        }),
    },
};
