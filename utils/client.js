import mongoose from 'mongoose';
import Client from './clientModel'; // Ensure the correct path to the client model

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

        // Map over the clients array to add the workspaceId to each client
        const clientsWithWorkspaceId = clients.map(client => ({
            ...client,
            workspace_id: workspaceId
        }));

        // Use insertMany to save all clients in one operation
        const savedClients = await Client.insertMany(clientsWithWorkspaceId);
        console.log("savedClients", savedClients);

        return savedClients;
    } catch (error) {
        console.error('Error saving clients:', error);
        throw error;
    }
}