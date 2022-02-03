import client from '../client';

export default {
    CoffeeShop: {
        categories: ({ id }) =>
            client.category.findMany({
                where: { coffeeShops: { some: { id } } },
            }),
    },
    Category: {
        totalShops: ({ id }) =>
            client.coffeeShop.count({
                where: {
                    category: { some: { id } },
                },
            }),
    },
};
