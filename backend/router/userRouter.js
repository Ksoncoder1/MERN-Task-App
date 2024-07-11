import express from 'express';
import { getUser, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, getUser);
router.post('/logout', isAuthenticated, logout);

export default router;