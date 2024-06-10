import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

export default router;
