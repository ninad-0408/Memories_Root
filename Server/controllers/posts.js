import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
        
    } catch(error) {
        res.status(error.status).json({ message : error.message });
    }
};

export const createPost = async (req,res) => {
    res.send('Creation of Post.');
}