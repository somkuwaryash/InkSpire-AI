// src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as apiRouter } from './routes/api';
import contentRoutes from './routes/contentRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRouter);
app.use('/api/content', contentRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


