import familycoinClient from 'bitcoin-core'

const familycoin = new familycoinClient({
    host: process.env.FAMILYCOIN_HOST,
    port: process.env.FAMILYCOIN_PORT,
    username: process.env.FAMILYCOIN_USERNAME,
    password: process.env.FAMILYCOIN_PASSWORD
})

const getPublicKey = async (account) => {
    return await familycoin.getNewAddress(account)
}

const getPrivateKey = async (publicKey) => {
    return await familycoin.dumpPrivKey(publicKey)
}

exports.getPublicKey = getPublicKey
exports.getPrivateKey = getPrivateKey