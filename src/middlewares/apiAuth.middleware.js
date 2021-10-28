import { Router } from 'express';
import { error} from '../interfaces/ApiResponse.interface'
import jwt from 'jsonwebtoken'

const apiAuth = Router(); 
apiAuth.use((req, res, next) => {
    const token = req.headers['familycoin-access-key'];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {      
        if (err) {
          return res.status(401).json(error(err));    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
        return res.status(401).json(error({ 
            mensaje: 'Token no proveída.' 
        }));
    }
 });

 exports.apiAuth = apiAuth;