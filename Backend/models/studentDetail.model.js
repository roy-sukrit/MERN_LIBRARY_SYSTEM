const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const librarySchema = new Schema({

  studentName: { type: String, required: true ,uppercase: true},

  studentAddress: { type: String, required: true },

  id_Number: { type: Number, required: true },

  approve:{ type: Number, default:0}
  

  
}, {
  timestamps: true,
});

const studentDetail = mongoose.model('studentDetail', librarySchema);

module.exports = studentDetail;