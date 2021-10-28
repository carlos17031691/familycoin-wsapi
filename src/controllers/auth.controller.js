import bcrypt from 'bcrypt'
import {success, error} from '../interfaces/ApiResponse.interface'
import authService from '../services/auth.service'

const saltRounds = 12;

const register = async (req, res) => { 
    try {
        const user = await authService.register(req.body)    
        return res.status(201).json(success(user)) 
    } catch (err) {
        return res.status(403).json(error(err)) 
    }
}

const login = async (req, res) => { 
    try {
        const user = await authService.login(req.body)    
        return res.status(200).json(success(user)) 
    } catch (err) {
        return res.status(401).json(error("Verify your credentials")) 
    }
}

exports.register = register;
exports.login = login;
