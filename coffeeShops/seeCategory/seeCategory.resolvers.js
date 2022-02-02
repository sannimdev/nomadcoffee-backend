import client from '../../client';
import { getPagination } from '../coffeeShops.utils';

export default {
    Query: {
        seeCategory: (_, { id, page }) => {
            const { take, skip } = getPagination(page);
            return client.coffeeShop.findMany({ where: { category: { some: { id } } }, take, skip });
        },
    },
};
