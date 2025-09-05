import mongoose from 'mongoose';

function connectDB() {
    mongoose.connect('mongodb://localhost:27017/fraudshield')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
}

export default connectDB;