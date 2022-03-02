import client from '../../client';
import { getPagination } from '../coffeeShops.utils';

export default {
    Query: {
        seeCoffeeShops: async (_, { page = 1 }) => {
            const { take, skip } = getPagination(page);
            return client.coffeeShop.findMany({ take, skip, orderBy: { createdAt: 'desc' } });
        },
    },
};
