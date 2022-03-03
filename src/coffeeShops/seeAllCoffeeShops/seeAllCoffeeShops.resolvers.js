import client from '../../client';

export default {
    Query: {
        seeAllCoffeeShops: async (_, __, { loggedInUser }) => {
            return client.coffeeShop.findMany({
                orderBy: { createdAt: 'desc' },
                select: { id: true, name: true },
            });
        },
    },
};
