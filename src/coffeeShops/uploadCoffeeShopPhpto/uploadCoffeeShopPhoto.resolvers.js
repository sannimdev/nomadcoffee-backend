import GraphQLUpload from 'graphql-upload';
import client from '../../client';
import { uploadPhoto } from '../../lib/imgbb';
import { protectedUser } from '../../users/users.utils';

export default {
    Upload: GraphQLUpload,
    Mutation: {
        uploadCoffeeShopPhoto: protectedUser(async (_, { photo, shopId }, { loggedInUser }) => {
            try {
                const { image, thumb, medium } = await uploadPhoto(await photo);

                await client.coffeeShopPhoto.create({
                    data: {
                        url: image.url,
                        thumbnail: thumb?.url,
                        medium: medium?.url,
                        user: { connect: { id: loggedInUser.id } },
                        coffeeShop: { connect: { id: shopId } },
                    },
                });

                return { ok: true };
            } catch (error) {
                console.error('uploadCoffeeShopPhoto', error);
                return { ok: false, error: 'The Image have been failed.' };
            }
        }),
    },
};
