import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: {
            firstName: String,
            lastName: String
        },
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;