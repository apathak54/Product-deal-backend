import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    commodity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    template: {
        type:String ,
       
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace', 
        required: true
    },
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

export default Client;
