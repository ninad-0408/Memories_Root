import PostMessage from '../models/postMessage.js';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(error.status).json({ message : error.message });
    }
};

export const createPost = async (req,res) => {
    const body = req.body;
    
    const newPost = new PostMessage(body);
    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(error.status).json({ message : error.message });
    }
}

export const updatePost = async (req,res) => {

    const { id: _id } = req.params;
    const body = req.body;

    if(!mongoose.Schema.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Unable to find memory." });
    
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, body, { new: true });
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(error.status).json({ message : error.message });
    }
}