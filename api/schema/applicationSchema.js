const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Personal Info
  'Student Name': String,
  'HKID': String,
  
  // Application Details
  'App Category': String,
  'Year Applied': Number,
  'Band': Number,
  
  // Academic Info
  'Institution': String,
  'Programme': String,
  'cGPA': Number,
  'Max cGPA': Number,
  'Norm cGPA': Number,
  
  // Test Scores
  'DSE B5': Number,
  'CSD Grade': String,
  
  // Document Status
  'Transcript': String,
  'Achievement': [String],
  
  // Application Status
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: false }); // Allow any additional fields

module.exports = mongoose.model('ApplicationDB', applicationSchema, 'ApplicationDB');
