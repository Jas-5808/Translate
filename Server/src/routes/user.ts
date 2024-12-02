import { Router } from 'express';
import { addUser, getAllUsers } from '../controllers/userController';


const router = Router();

router.post('/adduser', addUser);
router.get('/getusers', getAllUsers);

export default router;