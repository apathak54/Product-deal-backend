import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Router Imports
import userRoutes from './routes/userRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config({ path: '.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.DB_URL, {
  
})
.then(() => {
  console.log("> DB connection successful ... ");
})
.catch(err => {
  console.error('DB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running', success: true });
});


app.use('/api/auth', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
