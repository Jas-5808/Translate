import express from 'express';
import speedRoutes from './src/routes/speed';
import userRoutes from './src/routes/user';
import { logger } from './src/middlewares/logger';
import path from 'path'
import cors from 'cors';
import { json } from 'stream/consumers';

const app = express();

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'build')));

// Routes
app.use('/api/speed', speedRoutes);
app.use('/api/user', userRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
