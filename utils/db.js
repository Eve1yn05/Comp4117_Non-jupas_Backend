const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://yuen-se-2025-fall:MLpV1Rb9Ig0cos4k5dHzmW23YLNw5ao6g0yKYgiFsvfKzXiHnaRlq0q2VxTzwZwHoVjvxRTwrAKfACDbqpOGYA%3D%3D@yuen-se-2025-fall.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@yuen-se-2025-fall@';
    
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully to Non-Jupas_System database');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
