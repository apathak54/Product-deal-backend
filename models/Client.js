import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    conpanyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    commodity: {
        type: String,
        required: true,
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace', required: true
    },
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

export default Client;