import express from 'express';
import speedRoutes from './routes/speed';
import userRoutes from './routes/user';
import { logger } from './middlewares/logger';
import cors from 'cors';

const app = express();

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/speed', speedRoutes);
app.use('/api/user', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
