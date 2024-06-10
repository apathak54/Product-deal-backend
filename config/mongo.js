import mongoose from 'mongoose';
require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/crm';

export default initMongo = () => {
    const connect = () => {
        mongoose.Promise = global.Promise;

        mongoose
            .connect(DB_URL)
            .then(() => {
                console.log('MongoDB connected successfully');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
                // Retry connection after a delay
                setTimeout(connect, 5000); // Retry after 5 seconds
            });

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            // Attempt to reconnect
            connect();
        });
    };

    connect();
};
