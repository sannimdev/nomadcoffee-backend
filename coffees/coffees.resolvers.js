import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default {
    Query: {
        coffees: () => client.coffee.findMany(),
        coffee: (id) => client.coffee.findUnique({ where: { id } }),
    },
    Mutation: {
        createCoffee: (_, { name, price, currency }) =>
            client.coffee.create({ data: { name, price, currency } }),
        deleteCoffee: (_, { id }) => client.coffee.delete({ where: { id } }),
        updateCoffee: (_, { id, price }) =>
            client.coffee.update({ where: { id }, data: { price } }),
    },
};
