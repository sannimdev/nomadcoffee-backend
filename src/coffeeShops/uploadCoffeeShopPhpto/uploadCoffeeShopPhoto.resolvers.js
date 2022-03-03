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
                const result = await client.coffeeShopPhoto.create({
                    data: {
                        url: image.url,
                        thumbnail: thumb?.url,
                        medium: medium?.url,
                        user: { connect: { id: loggedInUser.id } },
                        coffeeShop: { connect: { id: shopId } },
                    },
                });
                console.log(result);
                return result;
            } catch (error) {
                console.error('uploadCoffeeShopPhoto', error);
                throw new Error(error);
            }
        }),
    },
};
