import PostMessage from '../models/postMessage.js';
import mongoose from "mongoose";

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

    const { id } = req.params;
    const body = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Unable to find memory." });
    
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...body, _id: id }, { new: true });
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(error.status).json({ message : error.message });
    }
}

export const likePost = async (req,res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Unable to find memory." });

    try {
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(error.status).json({ message : error.message });
    }
}

export const deletePost = async (req,res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Unable to find memory." });

    try {
        await PostMessage.findByIdAndDelete(id);
        return res.status(200).json({ message: "Memory deleted successfully." });        
        
    } catch (error) {
        res.status(error.status).json({ message : error.message });
    }
}