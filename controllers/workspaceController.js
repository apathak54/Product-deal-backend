import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

export async function createWorkspace(req, res) {
    try {
        const { workspaceName } = req.body;
        const existingWorkspace = await Workspace.findOne({ name: workspaceName });
        if (existingWorkspace) {
            return res.status(409).json({ message: "Workspace already exists", success: false, existingWorkspace });
        }
        const newWorkspace = new Workspace({
            name: workspaceName,
            user_id: req.user.id,
            clients: []
        });
        const savedWorkspace = await newWorkspace.save();
        if (!savedWorkspace) {
            return res.status(400).json({ message: "Failed to save workspace", success: false, savedWorkspace });
        }
        return res.status(201).json({ message: "Workspace saved successfully", success: true, savedWorkspace });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
}

export async function getWorkspaces(req, res) {
    try {
        const workspace = await Workspace.find({ user_id: req.user.id });
        console.log(req.user_id)
        if (!workspace) {
            return res.status(404).json({ message: "No workspaces found", success: false, workspace });
        }
        return res.status(200).json({ message: "Workspaces found", success: true, workspace  });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
}