import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'memoryModel',
        default: []
    },
    password: String,
    googleId: String,
    imageUrl: String

});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;