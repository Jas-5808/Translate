import express, { Request, Response } from 'express';
import { addUser, getAllUsers, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/adduser', addUser);

router.get('/getusers', getAllUsers);

router.delete('/deleteuser/:id', deleteUser);

export default router;
