import { gql } from 'apollo-server';

export default gql`
    scalar Upload
    type Mutation {
        editProfile(
            name: String
            location: String
            password: String
            githubUsername: String
            avatar: Upload
        ): MutationResponse!
    }
`;
