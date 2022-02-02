import client from '../../client';
import { protectedUser } from '../../users/users.utils';
import { getCategories } from '../coffeeShops.utils';

export default {
    Mutation: {
        createCoffeeShop: protectedUser(async (_, { name, category, latitude, longitude }, { loggedInUser }) => {
            const connectOrCreate = getCategories(category);
            await client.coffeeShop.create({
                data: {
                    name,
                    latitude,
                    longitude,
                    user: {
                        connect: { id: loggedInUser.id },
                    },
                    ...(connectOrCreate.length && { category: { connectOrCreate } }),
                },
            });
            return {
                ok: true,
            };
        }),
    },
};
