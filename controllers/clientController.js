import Client from "../models/Client.js";
import Workspace from "../models/Workspace.js";
import { saveClients } from "../utils/client.js";
import readSpreadsheet from "../utils/spreadSheet.js";


export async function addSingleClient(req, res) {
    try {
        const { clientName, companyName, email, commodity ,template} = req.body;
        const { workspaceId } = req.params;
        
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found", success: false, workspace });
        }
        if (!workspace.user_id.equals(req.user.id)) {
            return res.status(401).json({ message: "Unauthorized", success: false, workspace });
        }
        const newClient = new Client({
            clientName,
            companyName,
            email,
            commodity,
            status: 'pending',
            template,
            workspace_id: workspaceId
        });
        const savedClient = await newClient.save();
        if (!savedClient) {
            return res.status(500).json({ message: 'Error while saving new client', success: false, error: error.message, newClient });
        }
        workspace.clients.push(savedClient._id);
        return res.status(200).json({ message: 'Successfully saved client', success: 'true', savedClient });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
}
export async function deleteSingleClient(req, res) {
    console.log('Delete request received for clientId:', req.params.clientId);
    try {
        const { workspaceId, clientId } = req.params;
    
        // Check if the workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
          return res.status(404).json({ message: "Workspace not found", success: false });
        }
    
        // Ensure the requesting user has permission to delete clients in this workspace
        if (!workspace.user_id.equals(req.user.id)) {
          return res.status(401).json({ message: "Unauthorized", success: false });
        }
    
        // Find the client by ID and delete it
        const deletedClient = await Client.findByIdAndDelete(clientId);
        if (!deletedClient) {
          return res.status(404).json({ message: "Client not found", success: false });
        }
    
        // Respond with success message
        return res.status(200).json({ message: 'Client deleted successfully', success: true });
      } catch (error) {
        console.error('Error deleting client:', error);
        return res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
      }
}

export async function getClients(req, res) {
    try {
        const { workspaceId } = req.params;
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found", success: false, workspace });
        }
        if (!workspace.user_id.equals(req.user.id)) {
            return res.status(401).json({ message: "Unauthorized", success: false, workspace });
        }
        const clients = await Client.find({ workspace_id: workspaceId });
        if (!clients)
            return res.status(404).json({ message: "No clients found", success: false, clients });
        return res.status(200).json({ success: true, clients });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
}

export async function addClientsWithSheet(req, res) {
    try {
        const { workspaceId } = req.params;
        const workspace = await Workspace.findById(workspaceId);
        if(!workspace){
            return res.status(404).json({ message: "Workspace not found", success: false, workspace });
        }
        const clients = readSpreadsheet(req.file.filename, workspaceId);
        const savedClients = await saveClients(clients, workspaceId);
        if(!savedClients){
            return res.status(404).json({ message: "No clients found", success: false, savedClients });
        }
        const {error} = savedClients;
        if(error){
            return res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
        }
        return res.status(200).json({ success: true, clients });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
}