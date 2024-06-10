import * as workspaceController from '../controllers/workspaceController.js';
import express from 'express';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/create',userAuth, workspaceController.createWorkspace);
router.get('/', userAuth, workspaceController.getWorkspaces);

export default router;