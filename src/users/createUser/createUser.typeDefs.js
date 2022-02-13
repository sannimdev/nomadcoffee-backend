import { gql } from 'apollo-server';

export default gql`
    type Mutation {
        createUser(
            username: String!
            email: String!
            name: String!
            location: String
            password: String!
            avatarURL: String
            githubUsername: String
        ): MutationResponse!
    }
`;
