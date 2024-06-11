import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import readSpreadsheet from './utils/spreadSheet.js';
import upload from './config/fileStorage.js';

//Router Imports
import userRoutes from './routes/userRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js'
import clientRoutes from './routes/clientRoutes.js';

const app = express();

app.use(cors());
dotenv.config({path:'.env'});



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

app.post('/upload-csv', upload.single('csvfile'), function (req, res, next) {
  
  console.log(req.file);
  res.send('File uploaded successfully');
})

//Routes
app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/clients', clientRoutes)
// readSpreadsheet();

app.listen(process.env.PORT, (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server is up and running on port " + process.env.PORT);
    }
});