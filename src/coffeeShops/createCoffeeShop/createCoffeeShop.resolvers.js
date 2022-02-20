import client from '../../client';
import { protectedUser } from '../../users/users.utils';
import { getCategories } from '../coffeeShops.utils';

export default {
    Mutation: {
        createCoffeeShop: protectedUser(async (_, { name, category, latitude, longitude }, { loggedInUser }) => {
            const connectOrCreate = getCategories(category);
            const newCoffeeShop = await client.coffeeShop.create({
                data: {
                    name,
                    latitude,
                    longitude,
                    user: {
                        connect: { id: loggedInUser.id },
                    },
                    ...(connectOrCreate.length && { category: { connectOrCreate } }),
                },
                select: { id: true },
            });
            return {
                ok: true,
                id: newCoffeeShop.id,
            };
        }),
    },
};
