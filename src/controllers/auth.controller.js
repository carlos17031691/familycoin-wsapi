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

const emailValidate = async (req, res) => { 
    try {
        const valid = await authService.emailValidate(req.body.email)
        if (valid != null){
            return res.status(200).json(success(valid)) 
        }else {
            return res.status(403).json(error("Email not exists")) 
        } 
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(error(err)) 
    }
}

const getUserInfo = async (req, res) => { 
    try {
        const user = await authService.getUserInfo(req.headers['familycoin-access-key']);    
        return res.status(200).json(success(user)) 
    } catch (err) {
        return res.status(401).json(error("No autorizado")) 
    }
      
}

exports.register = register;
exports.login = login;
exports.emailValidate = emailValidate;
exports.getUserInfo = getUserInfo;