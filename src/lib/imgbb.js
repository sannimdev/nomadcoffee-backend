import axios from 'axios';
import FormData from 'form-data';

export const uploadPhoto = async (photo) => {
    try {
        const formData = new FormData();
        const readStream = photo.createReadStream();

        formData.append('key', process.env.IMGBB_API_KEY);
        formData.append('image', await getBase64(readStream));
        const config = {
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            headers: {
                ...formData.getHeaders(),
            },
            data: formData,
        };
        const {
            data: { data, status, success },
        } = await axios(config);
        if (!success || status !== 200) {
            console.log(data);
            throw new Error(data);
        }
        return data; // 썸네일은 나중에 작업하기
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

// // THANKS!!!
// // from https://stackoverflow.com/questions/46054531/nodejs-unable-to-convert-stream-buffer-to-base64-string
function getBase64(readableStream) {
    return new Promise((resolve, reject) => {
        let buffers = [];
        let myStream = readableStream;
        myStream.on('data', (chunk) => {
            buffers.push(chunk);
        });
        myStream.once('end', () => {
            let buffer = Buffer.concat(buffers);
            resolve(buffer.toString('base64'));
        });
        myStream.once('error', (err) => {
            reject(err);
        });
    });
}
