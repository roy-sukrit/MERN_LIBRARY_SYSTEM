const mongoose = require('mongoose');
const moment = require('moment');

const today = moment();
console.log(today.format('DD-MM-YYYY'));
const return_date=today.add(7,'days')
console.log(return_date.format('DD-MM-YYYY'));



const Schema = mongoose.Schema;

const librarySchema = new Schema({

  student_id: { type: Number, required: true },

  ISBN: { type: Number, required: true },
 
  Fine:{ type: Number, default:0 }

  
}, {
  timestamps: true,
});

const fineDetail = mongoose.model('fineDetail', librarySchema);

module.exports = fineDetail;