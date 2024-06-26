import mongoose from 'mongoose';
import Client from '../models/Client.js';
/**
 * Save an array of clients to the database
 * @param {Array} clients - Array of client objects
 * @param {String} workspaceId - Workspace ID
 * @returns {Promise} - Resolves when all clients are saved, rejects on error
 */
export async function saveClients(clients, workspaceId) {
    try {
        // Validate input
        if (!Array.isArray(clients) || !mongoose.Types.ObjectId.isValid(workspaceId)) {
            throw new Error('Invalid input data');
        }

        // Use insertMany to save all clients in one operation
        const savedClients = await Client.insertMany(clients, {
            validateBeforeSave: true,
            ordered: true
        });

        // // Check for duplicate emails
        // const duplicateEmails = savedClients.filter((client, index) => {
        //     return index < savedClients.length - 1 && client.email === savedClients[index + 1].email;
        // });
        // console.log("duplicateEmails", duplicateEmails);

        // if (duplicateEmails.length > 0) {
        //     console.log("Yes returning this");
        //     return res.status(400).json({ message: 'Duplicate clients found', success: false, duplicateEmails });
        // }
        return savedClients;
    } catch (error) {
        throw error;
    }

}