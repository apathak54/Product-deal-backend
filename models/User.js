import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    workspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workspace'
    }, { timestamp: true }]
});

const User = mongoose.model('User', userSchema);

export default User;