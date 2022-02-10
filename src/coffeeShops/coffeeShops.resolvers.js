import client from '../client';

export default {
    CoffeeShop: {
        categories: ({ id }) =>
            client.category.findMany({
                where: { coffeeShops: { some: { id } } },
            }),
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
        // 대표 사진 최근 1건
        photo: ({ id }) => client.coffeeShopPhoto.findFirst({ where: { shopId: id }, orderBy: { id: 'desc' } }),
        isMine: ({ userId }, _, { loggedInUser }) => (loggedInUser ? userId === loggedInUser.id : false),
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
