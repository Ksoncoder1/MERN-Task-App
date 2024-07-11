import express from 'express';
import { createTask, deleteTask, getMyTasks, updateTask } from '../controllers/taskController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/newtask', isAuthenticated, createTask);
router.get('/mytasks', isAuthenticated, getMyTasks);
router.delete('/deletetask/:id', isAuthenticated, deleteTask);
router.put('/updatetask/:id', isAuthenticated, updateTask);

export default router;