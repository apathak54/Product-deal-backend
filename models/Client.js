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
        unique: true,
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

Client.collection.createIndex({ email: 1 }, { unique: true }, (err, result) => {
    if (err) {
        console.log("Trying to save duplicate clients, operation failed.")
    }
});

export default Client;