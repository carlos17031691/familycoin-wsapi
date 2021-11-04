import familycoin from '../services/familycoin.service'
import walletModel from '../models/wallet.model'
const crypto = require("crypto");

const initVector = process.env.INIT_VECTOR;
const Securitykey = process.env.SECURITY_KEY;

const createWallet = async (user) => {
    try {
        const publicKey =  await familycoin.getPublicKey(user.email)
        const privateKey =  await familycoin.getPrivateKey(publicKey)
        const algorithm = "aes-256-cbc"; 
        const cipher = crypto.createCipheriv("aes-256-cbc", Securitykey, initVector);
        let encryptedPrivateKey = cipher.update(privateKey, "utf-8", "hex");
        encryptedPrivateKey += cipher.final("hex");

        const data = {
            address: publicKey,
            privateKey: encryptedPrivateKey,
            balance: 0,
            userId: user.id
        }
        const wallet = await walletModel.newWallet(data); 
        data.privateKey = privateKey;
        return data
    } catch (err) {
        console.log(err)
        throw err;
    }
}



exports.createWallet = createWallet



