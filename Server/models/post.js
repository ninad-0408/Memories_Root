import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel'
    },
    selectedFile: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'userModel',
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const memoryModel = mongoose.model('memoryModel', postSchema);

export default memoryModel;