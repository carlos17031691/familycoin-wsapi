import familycoinClient from 'bitcoin-core'
import walletModel from '../models/wallet.model'
const crypto = require("crypto");

const initVector = process.env.INIT_VECTOR;
const Securitykey = process.env.SECURITY_KEY;

const familycoin = new familycoinClient({
    host: process.env.FAMILYCOIN_HOST,
    port: process.env.FAMILYCOIN_PORT,
    username: process.env.FAMILYCOIN_USERNAME,
    password: process.env.FAMILYCOIN_PASSWORD
})

const createWallet = async (user) => {
    try {
        const publicKey =  await getPublicKey(user.email)
        const privateKey =  await getPrivateKey(publicKey)
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

const getPublicKey = async (account) => {
    return await familycoin.getNewAddress(account)
}

const getPrivateKey = async (publicKey) => {
    return await familycoin.dumpPrivKey(publicKey)
}



exports.createWallet = createWallet


