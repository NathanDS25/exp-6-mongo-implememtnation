import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contacts.js';
import { errorHandler } from './middleware/validation.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-manager';

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('✓ Connected to MongoDB successfully');
  } catch (err) {
    console.error('✗ MongoDB connection failed:', err.message);
    console.log('⚠ Initializing in-memory database fallback...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('✓ Connected to In-Memory MongoDB successfully (Fallback)');
    } catch (fallbackErr) {
      console.error('✗ In-Memory MongoDB fallback failed:', fallbackErr.message);
    }
  }
};
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/contacts', contactRoutes);

// Root API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Contact Manager API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      getAllContacts: 'GET /api/contacts',
      getContactById: 'GET /api/contacts/:id',
      createContact: 'POST /api/contacts',
      updateContact: 'PUT /api/contacts/:id',
      deleteContact: 'DELETE /api/contacts/:id',
      searchContacts: 'GET /api/contacts/search/query?q=searchterm'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use(errorHandler);

// Export the app for Vercel
export default app;

// Start server only if NOT on Vercel (local development)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════════════╗`);
    console.log(`║  Contact Manager API Server           ║`);
    console.log(`║  Running on: http://localhost:${PORT}          ║`);
    console.log(`║  MongoDB: ${MONGODB_URI.substring(0, 26).padEnd(32)}║`);
    console.log(`╚════════════════════════════════════════╝\n`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});
