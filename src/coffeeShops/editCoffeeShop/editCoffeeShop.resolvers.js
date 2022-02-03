import client from '../../client';
import { protectedUser } from '../../users/users.utils';
import { getCategories } from '../coffeeShops.utils';

export default {
    Mutation: {
        editCoffeeShop: protectedUser(async (_, { id, name, category, latitude, longitude }, { loggedInUser }) => {
            const oldCoffeeShop = await client.coffeeShop.findUnique({ where: { id }, include: { category: true } });
            if (!oldCoffeeShop) {
                return {
                    ok: false,
                    error: 'CoffeeShop not found',
                };
            }
            const oldCoffeeCategories = oldCoffeeShop.category.map(({ id }) => ({ id }));
            const connectOrCreate = getCategories(category);
            console.log(oldCoffeeCategories);
            await client.coffeeShop.update({
                where: { id },
                data: {
                    name,
                    latitude,
                    longitude,
                    category: {
                        disconnect: oldCoffeeCategories,
                        ...(connectOrCreate.length && { connectOrCreate }),
                    },
                },
            });
            return {
                ok: true,
                error: '임시',
            };
        }),
    },
};
