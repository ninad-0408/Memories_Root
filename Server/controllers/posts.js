import mongoose from "mongoose";
import memoryModel from '../models/post.js';

import { dataUnaccesable, notFound, notValid } from '../alerts/errors.js';

export const getPosts = async (req,res) => {
    try {
        const posts = await memoryModel.find()
                                       .populate('creator', ['name', 'imageUrl']);
        return res.status(200).json(posts);

    } catch (error) {
        return dataUnaccesable(res);
    }
};

export const createPost = async (req,res) => {
    var body = req.body;
    body.creator = mongoose.Types.ObjectId(req.userId);

    try {
        const { id: _id } = await memoryModel.create(body);
        const post = await memoryModel.findById(id)
                                .populate('creator', ['name', 'imageUrl']);
        return res.status(200).json(post);

    } catch (error) {
        console.log(error);
        return dataUnaccesable(res);
    }
};

export const updatePost = async (req,res) => {

    const { id } = req.params;
    const body = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    return notValid(res);
    
    try {
        const updatedPost = await memoryModel.findByIdAndUpdate(id, { ...body, _id: id }, { new: true })
                                             .populate('creator', ['name', 'imageUrl']);
        if(updatedPost)
        return res.status(200).json(updatedPost);

    } catch (error) {
        return dataUnaccesable(res);
    }

    return notFound(res, 'Memory');
};

export const likePost = async (req,res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    return notValid(res);

    try {
        const post = await memoryModel.findById(id);
        const updatedPost = await memoryModel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
                                             .populate('creator', ['name', 'imageUrl']);
        if(updatedPost)
        return res.status(200).json(updatedPost);

    } catch (error) {
        return dataUnaccesable(res);
    }

    return notFound(res, 'Memory');
};

export const deletePost = async (req,res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    return notValid(res);

    try {
        const updatedPost = await memoryModel.findByIdAndDelete(id);
        if(updatedPost)
        return res.status(200).json({ message: "Memory deleted successfully." });        
        
    } catch (error) {
        return dataUnaccesable(res);
    }

    return notFound(res, 'Memory');
};