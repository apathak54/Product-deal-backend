import mongoose from "mongoose";


const draftSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    html: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Draft = mongoose.model('Draft', draftSchema);

export default Draft;
