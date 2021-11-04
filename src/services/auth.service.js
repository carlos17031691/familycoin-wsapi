import userModel from '../models/user.model'
import walletService from './wallet.service'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async (data) => {
    try {
        data.password = bcrypt.hashSync(data.password, 12);
        const createUser = await userModel.newUser(data);  
        const wallet = await walletService.createWallet(createUser) 
        delete createUser.password
        delete createUser.createdAt 
        const payload = {
            sub: createUser.id,
            name: createUser.name,
            email: createUser.email,
            wallet: wallet.address,
            balance: wallet.balance
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_TTL)
        });
        return {createUser, wallet, token};
           
    } catch (err) {
        throw err;
    }
}

const login = async (data) => {
    try {
        const user = await userModel.getUserByEmail(data.email);
        if(user != null && bcrypt.compareSync(data.password,user.password)) {
            const payload = {
                sub: user.id,
                name: user.name,
                email: user.email,
                wallet: user.wallet.address,
                balance: user.wallet.balance
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_TTL)
            });
            return {token, user}
        } else {
            throw err;
        }
        
    } catch (err) {
        throw err;
    }
}

const emailValidate = async (email) => {
    try {
        const user = await userModel.getUserByEmail(email);
        console.log(user)
        if(user != null) {
            const userValid = {
                name: user.name,
                email: user.email,
                address: user.wallet.address
            }
            return userValid
        } else {
            return null;
        }
        
    } catch (err) {
        throw err;
    }
}

const getUserInfo = async (token) => {
    const base64String = token.split('.')[1];
   const decodedValue = JSON.parse(Buffer.from(base64String,'base64').toString('ascii'));
    try {
        const user = await userModel.getUserByEmail(decodedValue.email);
        return user
    } catch (err) {
        console.log(err)
        throw err;
    }
}
exports.register = register
exports.login = login
exports.emailValidate = emailValidate
exports.getUserInfo = getUserInfo