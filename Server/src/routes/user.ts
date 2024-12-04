import express, { Request, Response } from 'express';
import { addUser, getAllUsers, deleteUser } from '../controllers/userController';

const router = express.Router();

// Маршрут для добавления пользователя
router.post('/adduser', addUser);

// Маршрут для получения всех пользователей
router.get('/getusers', getAllUsers);

// Маршрут для удаления пользователя
router.delete('/deleteuser/:id', deleteUser);

export default router;
