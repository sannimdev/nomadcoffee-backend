import client from '../../client';

export default {
    Query: {
        seeCategories: async (_, { page = 1 }) => {
            const take = 5;
            const skip = (page - 1) * take;
            return client.category.findMany({
                take,
                skip,
            });
        },
    },
};
