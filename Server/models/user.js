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
    password: String,
    googleId: String,
    imageUrl: String

});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;