import client from '../../client';

export default {
    Query: {
        searchCoffeeShops: (_, { keyword }) =>
            client.coffeeShop.findMany({
                where: {
                    OR: [
                        {
                            category: { some: { name: { contains: keyword } } },
                        },
                        {
                            name: { contains: keyword },
                        },
                    ],
                },
            }),
    },
};
