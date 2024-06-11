import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//Router Imports
import userRoutes from './routes/userRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js'
import clientRoutes from './routes/clientRoutes.js';

dotenv.config({path:'.env'});

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  headers: ['Content-Type', 'Authorization', 'Accept'], // Allow specific headers
  credentials: true, // Allow cookies and authentication
  exposedHeaders: ['Set-Cookie'] // Allow exposing cookies
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});



mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("> DB connection successful ... ");
  });



app.use(helmet());


app.use(bodyParser.json({ limit: '5mb' }));


//Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up and running', success: true });
});

app.use('/api/auth', userRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/clients', clientRoutes)

app.listen(process.env.PORT, (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server is up and running on port " + process.env.PORT);
    }
});