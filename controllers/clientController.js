import Client from "../models/Client.js";
import Workspace from "../models/Workspace.js";


export async function addSingleClient(req, res) {
    try {
        const { clientName, companyName, email, commodity } = req.body;
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