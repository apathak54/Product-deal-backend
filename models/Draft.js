// models/Email.js

import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  template: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent'],
    default: 'draft'
  },
  // Add any other fields related to emails
}, { timestamps: true });

const Draft = mongoose.model('Draft', emailSchema);

export default Draft;