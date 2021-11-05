import mongoose from "mongoose";
import memoryModel from '../models/post.js';

import { dataUnaccesable, notAuthorized, notFound, notValid } from '../alerts/errors.js';


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
        await memoryModel.create(body);
        const post = await memoryModel.findOne(body)
                                      .populate('creator', ['name', 'imageUrl']);
        return res.status(200).json(post);

    } catch (error) {
        return dataUnaccesable(res);
    }
};

export const updatePost = async (req,res) => {

    const { id } = req.params;
    const body = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    return notValid(res);
    
    try {
        const post = await memoryModel.findById(id, 'creator');

        if(!post)
        return notFound(res, 'Memory');
        else if(!post.creator.equals(req.userId))
        return notAuthorized(res);

        const updatedPost = await memoryModel.findByIdAndUpdate(id, { ...body, _id: id, createdAt: new Date() }, { new: true })
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

        if(!post)
        return notFound(res, 'Memory');
        
        if(post.likes.indexOf(req.userId)==-1)
        {
            post.likeCount = post.likeCount + 1;
            post.likes.push(mongoose.Types.ObjectId(req.userId));
        }
        else
        {
            post.likeCount = post.likeCount - 1;
            post.likes = post.likes.filter((e) => !e.equals(req.userId));
        }
        
        await post.save();
        const postmod = await memoryModel.findById(id)
                                         .populate('creator', ['name', 'imageUrl']);
        return res.status(200).json(postmod);


    } catch (error) {
        return dataUnaccesable(res);
    }
};

export const deletePost = async (req,res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    return notValid(res);

    try {
        const post = await memoryModel.findById(id, 'creator');
        
        if(!post)
        return notFound(res, 'Memory');
        else if(!post.creator.equals(req.userId))
        return notAuthorized(res);

        const updatedPost = await memoryModel.findByIdAndDelete(id);
        if(updatedPost)
        return res.status(200).json({ id, message: "Memory deleted successfully." });        
        
    } catch (error) {
        return dataUnaccesable(res);
    }

    return notFound(res, 'Memory');
};