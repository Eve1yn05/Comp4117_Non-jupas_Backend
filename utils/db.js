const { MongoClient } = require('mongodb');
require('dotenv').config();

let client = null;
let db = null;

const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('applicationsDB');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn('MongoDB connection warning:', error.message);
    console.warn('Server will continue without database. Login functionality will not work.');
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
