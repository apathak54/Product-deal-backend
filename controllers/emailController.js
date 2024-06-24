import nodemailer from 'nodemailer'
import Client from '../models/Client';
import Draft from '../models/Draft';

// Set up the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // Your email address
        pass: process.env.MAIL_PASS, // Your email password
    }
});

export const  saveDraft = async (req, res) => {
    try {
        const { clientId, html } = req.body;

        // Check if the client exists
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const draft = new Draft({ clientId, html });
        await draft.save();
        res.status(200).json({ message: 'Draft saved successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const  sendDraft = async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id).populate('clientId');
        if (!draft) {
            return res.status(404).json({ message: 'Draft not found' });
        }

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: 'rahulkgg078@gmail.com',
            subject: draft.subject,
            html: draft.html,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(500).json({ error });
            }
            await Draft.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Email sent successfully', success: true });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
