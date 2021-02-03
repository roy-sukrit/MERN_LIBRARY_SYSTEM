const router = require('express').Router();
const bookDetail = require('../models/bookDetail.model');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const BookController= require( '../controllers/Book_Controller')
const csv = require('fast-csv');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });


/*
!<----BOOK DETAILS API-------->

^1.Get all books
&2.Get books by id
*3.Change book status on Issue
?4.Add Book to Library
*/



//^<---------Getting all the books------------>
router.get('/',BookController.getBooks)



//^<---------Getting unique the books------------>

router.get('/unique_books',BookController.getUniqueBooks)



//^<---------Getting  the books by title------------>

router.post('/by_Title',BookController.getByTitle)

//^<----------Getting books by id-------------->


router.get('/:id',BookController.getById)


//^<----------Change Book_Status on issue------->
router.post('/status',BookController.getBookStatus)


//^<--------------Add book to Library-------------->

router.post('/add',BookController.addBook)


//^<----------Getting isssued books by id-------------->
router.post('/book_status',BookController.getStatus)

//^<----------Uploading CSV File-------------->

router.post("/books_CSV", upload.single("file"), (req, res) => {



  if (req.file) {

    const result = excelToJson({
        sourceFile: req.file.path,
        header:{
            rows: 1
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        }
        
    });

    
    bookDetail.insertMany(result.Sheet1)   
  .then(() => res.json('Book Detail Added! '))
  .catch(err => res.status(400).json('Error: ' + err))


  } 

  else{
      res.json('FAILURE CSV')
  }
    
});
  



module.exports = router;
