import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import { notAuthorized, dataUnaccesable } from '../alerts/errors.js';

const auth = async (req, res, next) => {
    
    try {

        const token = req.headers.authorization?.split(' ')[1];
        
        if(token)
        {
            if(token.length < 500)
            req.userId = jwt.verify(token, 'test').id;
            else
            {
                const googleId = jwt.decode(token).sub;

                const user = await userModel.findOne({ googleId: googleId });

                req.userId = user._id;
            }
            next();
        }
        else
        return notAuthorized(res);
        
    } catch(error) {
        return dataUnaccesable(res);
    }

}

export default auth;