import { gql } from 'apollo-server';

export default gql`
    scalar Upload
    type EditProfileResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editProfile(
            name: String
            location: String
            password: String
            githubUsername: String
            avatar: Upload
        ): EditProfileResult
    }
`;
