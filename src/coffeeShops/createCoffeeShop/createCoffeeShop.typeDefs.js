import { gql } from 'apollo-server-express';

export default gql`
    type Mutation {
        createCoffeeShop(name: String!, category: String, latitude: String, longitude: String): MutationResponse!
    }
`;
