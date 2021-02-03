const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const librarySchema = new Schema({

  ISBN: { type: Number, required: true , unique:true},

  bookTitle: { type: String, required: true,uppercase: true },

  bookAuthor: { type: String, required: true },

  bookCategory:  { type: String ,required: true},

  book_status: { type: Number, default:1}

  
}, {
  timestamps: true,
});

const bookDetail = mongoose.model('bookDetail', librarySchema);

module.exports = bookDetail;