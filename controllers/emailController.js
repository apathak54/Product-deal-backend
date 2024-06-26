import nodemailer from 'nodemailer'
import Client from '../models/Client.js';
import Email from '../models/Draft.js';

// Set up the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // Your email address
        pass: process.env.MAIL_PASS, // Your email password
    }
});
export const  saveEmail = async (req, res) => {
    try {
        console.log('Request received:', req.body);
        const { clientId, template } = req.body;

        // Check if the client exists
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

          let email = await Email.findOne({clientId})
          if(email)
          {
          email.template=template;
          }
          else
          {
          email = new Email({ clientId, template });
          }
        await email.save();
        res.status(200).json({ message: 'Email saved successfully', success: true });
    } catch (error) {
    console.log("error saving Email ",error.stack);
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const  sendemail = async (req, res) => {
    try {
        const email = await email.findById(req.params.id).populate('clientId');
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: 'kanishkasrivastava629@gmail.com',
            subject: email.subject,
            html: email.html,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(500).json({ error });
            }
            await email.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Email sent successfully', success: true });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
