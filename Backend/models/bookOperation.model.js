const mongoose = require('mongoose');
const moment = require('moment');

const today = moment();
console.log(today.format('DD-MM-YYYY'));
const return_date=today.add(7,'days')
console.log(return_date.format('DD-MM-YYYY'));



const Schema = mongoose.Schema;

const librarySchema = new Schema({

  student_id: { type: Number, required: true },

  student_name:  { type: String, required: true },
  

  ISBN: { type: Number, required: true },

  book_name:  { type: String ,required: true}, 
  
  Books_Issued:{ type: Number, max:2,default:0 },

  Date_OfIssue: { type :Date},  
  
  Date_OfReturn: {  type :Date}, 
  
  Re_Issue:{ type: Number, default:0 },
  
  Fine:{ type: Number, default:0 }

  
}, {
  timestamps: true,
});

const operationDetail = mongoose.model('operationDetail', librarySchema);

module.exports = operationDetail;