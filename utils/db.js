const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://yuen-se-2025-fall:MLpV1Rb9Ig0cos4k5dHzmW23YLNw5ao6g0yKYgiFsvfKzXiHnaRlq0q2VxTzwZwHoVjvxRTwrAKfACDbqpOGYA%3D%3D@yuen-se-2025-fall.mongo.cosmos.azure.com:10255/Non-Jupas_System?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@yuen-se-2025-fall@';
    
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully to Non-Jupas_System database');
  } catch (error) {
    console.warn('MongoDB connection warning:', error.message);
    console.warn('Server will continue without database. Login functionality will not work.');
  }
};

module.exports = connectDB;
