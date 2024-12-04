import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { addUser, getAllUsers, deleteUser } from '../controllers/userController';

//limit
const postLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1,             
    message: 'Слишком много запросов. Попробуйте снова через минуту.',
    standardHeaders: true,
    legacyHeaders: false,
  });
//




const router = express.Router();

router.post('/adduser', postLimiter, addUser);

router.get('/getusers', getAllUsers);

router.delete('/deleteuser/:id', deleteUser);

export default router;
