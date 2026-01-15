import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { geminiRouter } from './routes/gemini';
import { manuscriptsRouter } from './routes/manuscripts';
import { authRouter } from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8085;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
app.use('/api', rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'x-book-backend',
    version: '1.0.0'
  });
});

app.get('/health.json', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'x-book-backend'
  });
});

// Routes
app.use('/api/gemini', geminiRouter);
app.use('/api/manuscripts', manuscriptsRouter);
app.use('/api/auth', authRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

export default app;
