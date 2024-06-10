import express from "express";
import * as clientController from '../controllers/clientController.js';
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post('/addOneClient/:workspaceId', userAuth, clientController.addSingleClient);

export default router;