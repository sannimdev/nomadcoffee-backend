require('dotenv').config();
import { ApolloServer, gql } from 'apollo-server';
import schema from './schema';

const server = new ApolloServer({
    schema,
});

const PORT = process.env.PORT || 4000;
server.listen(PORT).then(() => console.log('🥤 Server is running on http://localhost:4000'));
