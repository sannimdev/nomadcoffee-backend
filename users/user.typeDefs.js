import { gql } from 'apollo-server';

export default gql`
    type User {
        id: Int!
        username: String!
        email: String!
        name: String!
        location: String
        avatarURL: String
        githubUsername: String
        followers: [User]
        following: [User]
        totalFollowers: Int!
        totalFollowing: Int!
    }
    type Query {
        seeProfile(username: String!, followerLastId: Int, followingLastId: Int): User
    }
`;
