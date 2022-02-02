require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import logger from 'morgan';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

const PORT = process.env.PORT || 4000;
const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            return { loggedInUser: await getUser(req.headers.token) };
        },
    });
    await server.start();
    const app = express();
    app.use(logger('tiny'));
    app.use('/static', express.static('uploads'));
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });
    await new Promise((func) => app.listen({ port: PORT }, func));
    console.log(`🥤 Server is running on http://localhost:${PORT}/graphql`);
};

startServer();
