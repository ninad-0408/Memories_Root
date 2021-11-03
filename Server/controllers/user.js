import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from '../models/user.js';

export const login = async(req, res) => {

    const { email } = req.body;

    try {

        const user = await userModel.findOne({ email: email });
        
        if(!user)
        {
            if(req.body.googleId === undefined)
            return res.status(400).json({ message: 'The user does not exsists.' });
            else
            {
                const { name, googleId, imageUrl } = req.body;
                await userModel.create({ name: name, email: email, googleId: googleId, imageUrl: imageUrl });
                return res.status(200);
            }
        }

        if(user.googleId)
        return res.status(200).json({ result: user });

        const { password } = req.body;

        const verifyPassword = await bcrypt.compare(password, user.password);

        if(!verifyPassword)
        return res.status(404).json({ message: 'Password you have entered is incorrect.' });

        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: '1hr' });

        return res.status(200).json({ result: user, token });

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Try again later.' });
    }
};

export const signup = async(req, res) => {

    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const user = await userModel.findOne({ email: email });

        if(user)
        return res.status(403).json({ message: 'The emailid is already in use.' });

        if(password !== confirmPassword)
        return res.status(403).json({ message: 'The password and confirm password does not match.' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1hr' });

        return res.status(200).json({ result, token });

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Try again later.' });
    }

};