import { gql } from 'apollo-server-express';

export default gql`
    type Mutation {
        uploadCoffeeShopPhoto(photo: Upload!, shopId: Int!): MutationResponse!
    }
`;
