// models/Workspace.js
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }]
}, { timestamps: true });

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
