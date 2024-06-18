import express from 'express';


import userAuth from "../middleware/userAuth";
import { saveDraft, sendDraft } from '../controllers/emailController';


const router = express.Router();

router.post('/save-draft',userAuth , saveDraft)
router.post('/send-draft/:id',userAuth , sendDraft)

export default router;