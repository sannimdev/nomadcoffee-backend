import bcrypt from 'bcrypt';
import GraphQLUpload from 'graphql-upload';
import client from '../../client';
import { uploadPhoto } from '../../lib/imgbb';

export default {
    Upload: GraphQLUpload,
    Mutation: {
        createUser: async (_, { username, email, name, location, password, avatar, githubUsername }) => {
            try {
                // 현재 사용자가 존재하는지 체크하기
                const existedUser = await client.user.findFirst({
                    where: {
                        OR: [{ username }, { email }],
                    },
                });
                if (existedUser) {
                    throw new Error('The username or email is already taken.');
                }
                // 사용자 등록하기
                const encryptedPassword = await bcrypt.hash(password, 10);
                const newUser = await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        password: encryptedPassword,
                        githubUsername,
                    },
                    select: { id: true },
                });
                // 아바타 존재 시
                if (!!avatar) {
                    const { image, thumb, medium } = await uploadPhoto(await avatar);
                    await client.user.update({
                        where: { id: newUser.id },
                        data: {
                            avatarURL: thumb?.url,
                            avatarOriginalURL: image?.url,
                            avatarMediumURL: medium?.url,
                        },
                    });
                }
                return { ok: true };
            } catch (error) {
                return {
                    ok: false,
                    error,
                };
            }
        },
    },
};
