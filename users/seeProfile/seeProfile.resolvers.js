import client from '../../client';

export default {
    User: {
        followers: ({ id }, { followerLastId }) =>
            client.user.findUnique({ where: { id } }).followers({
                take: 5,
                skip: !!followerLastId * 1,
                ...(followerLastId && { cursor: { id: followerLastId } }),
            }),
        following: ({ id }, { followingLastId }) =>
            client.user.findUnique({ where: { id } }).following({
                take: 5,
                skip: !!followingLastId * 1,
                ...(followingLastId && { cursor: { id: followingLastId } }),
            }),
        totalFollowers: ({ id }) => client.user.count({ where: { following: { some: { id } } } }),
        totalFollowing: ({ id }) => client.user.count({ where: { followers: { some: { id } } } }),
    },
    Query: {
        seeProfile: (_, { username }) => client.user.findUnique({ where: { username } }),
    },
};
