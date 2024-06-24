import express from 'express';

import *as emailController from '../controllers/emailController.js'
import userAuth from '../middleware/userAuth.js';
const router = express.Router();

router.post('/save-draft', userAuth ,emailController.saveDraft);
router.post('/sendemail', emailController.sendDraft);

export default router;
