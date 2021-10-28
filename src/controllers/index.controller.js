import { success, error } from '../interfaces/ApiResponse.interface'

const index = (req, res) => {
    return res.send(success({ message: 'Welcome to Wallet Service API'}))
}

exports.index = index

