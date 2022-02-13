import { gql } from 'apollo-server-express';

export default gql`
    type Mutation {
        editCoffeeShop(id: Int!, name: String, category: String, latitude: String, longitude: String): MutationResponse!
    }
`;
