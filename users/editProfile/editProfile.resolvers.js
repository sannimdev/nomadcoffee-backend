import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs';
import bcrypt from 'bcrypt';
import { GraphQLUpload } from 'graphql-upload';
import client from '../../client';
import { protectUser } from '../users.utils';

export default {
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectUser(
            async (
                _,
                { name, location, password: newPassword, githubUsername, avatar },
                { loggedInUser }
            ) => {
                try {
                    let avatarURL = loggedInUser.avatarURL || null;
                    if (avatar) {
                        const { filename, createReadStream } = await avatar;
                        const savedPath = process.cwd() + '/uploads/' + loggedInUser.id;
                        const newFilename = `${Date.now()}${filename}`;
                        const readStream = createReadStream();
                        const writeStream = createWriteStream(savedPath + '/' + newFilename);
                        if (avatarURL) {
                            const oldFilename = avatarURL.substring(avatarURL.lastIndexOf('/'));
                            unlink(savedPath + oldFilename, () => {});
                        }

                        if (!existsSync(savedPath)) mkdirSync(savedPath);
                        readStream.pipe(writeStream);
                        avatarURL = `http://localhost:4000/static/${newFilename}`;
                    }

                    let encryptedPassword = null;
                    if (newPassword) {
                        encryptedPassword = await bcrypt.hash(newPassword, 10);
                    }

                    await client.user.update({
                        where: { id: loggedInUser.id },
                        data: {
                            name,
                            location,
                            githubUsername,
                            ...(newPassword && { password: encryptedPassword }),
                            avatarURL,
                        },
                    });
                    return {
                        ok: true,
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error,
                    };
                }
            }
        ),
    },
};
