import express from "express";
import * as clientController from '../controllers/clientController.js';
import userAuth from "../middleware/userAuth.js";
import upload from "../config/fileStorage.js";

const router = express.Router();

router.post('/addOneClient/:workspaceId', userAuth, clientController.addSingleClient);
router.get('/:workspaceId', userAuth, clientController.getClients);
router.post('/:workspaceId/upload-csv', userAuth, upload.single('csvfile'), clientController.addClientsWithSheet)
router.delete('/deleteOneclient/:workspaceId/:clientId',userAuth , clientController.deleteSingleClient)
export default router;