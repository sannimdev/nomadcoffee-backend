require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import logger from 'morgan';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
const startServer = async () => {
    const corsOptions = {
        // https://cheatcode.co/tutorials/how-to-set-up-a-graphql-server-with-apollo-server-and-express
        origin: (origin, callback) => callback(null, true),
        credentials: true,
    };
    const server = new ApolloServer({
        cors: cors(corsOptions),
        typeDefs,
        resolvers,
        introspection: true,
        playground: true,
        context: async ({ req }) => {
            return { loggedInUser: await getUser(req.headers.token) };
        },
    });
    await server.start();
    const app = express();
    app.use(cors(corsOptions));
    app.use(logger('tiny'));
    app.use('/static', express.static('uploads'));
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app, cors: corsOptions });
    await new Promise((func) => app.listen({ port: PORT }, func));
    console.log(`🥤 Server is running on http://(your ip):${PORT}/graphql`);
};

startServer();
