const bookDetail = require('../models/bookDetail.model');
const operationDetail = require('../models/bookOperation.model');




exports.getBooks=(req, res) => {
    bookDetail.find()
      .then(books => res.json(books))
      .catch(err => res.status(400).json('Error: ' + err));
  };

  exports.getUniqueBooks=(req, res) => {
    bookDetail.distinct("bookTitle")
      .then(books => res.json(books))
      .catch(err => res.status(400).json('Error: ' + err));
  };

exports.getById=(req, res) => {
    bookDetail.findById(req.params.id)
      .then(books => res.json(books))
      .catch(err => res.status(400).json('Error: ' + err));
  };


exports.getByTitle=(req, res) => {
  const Title=req.body.Name
    bookDetail.find({bookTitle:Title})
      .then(books => res.json(books))
      .catch(err => res.status(400).json('Error: ' + err));
  };

  exports.getBookStatus=(req, res) => {

    const ISBN=Number(req.body.ISBN)
     bookDetail.findOne({ISBN:ISBN})
     .then((user) => {
   
     user.book_status=!user.book_status
   
     user  
     .save()
     .then(()=>{res.json("Book Status Updated")})
     .catch(err=>{res.status(400).json(`Error: ${err}`)})
     
     
     });
   
   }

   exports.addBook=(req, res) => {
    const bookTitle = req.body.Title;
    const bookAuthor = req.body.Author;
    const ISBN = Number(req.body.ISBN);
    const bookCategory=req.body.Category;
  
    const newBookDetail = new bookDetail({
     bookTitle,
     bookAuthor,
     ISBN,
     bookCategory
    });
    console.log(newBookDetail)
  
    newBookDetail.save()
    .then(() => res.json('Book Detail Added! '))
    .catch(err => res.status(400).json('Error: ' + err));
  };



exports.getStatus=(req, res) => {
  const ISBN=req.body.ISBN
  operationDetail.find({Books_Issued:1,ISBN:ISBN})
  .exec((err,user)=>{     
    if(user==0){return res.json({details:[]})} 
    else{return res.json({details:user});}
  })  
};


// exports.post_CSV=(upload.single('file'),(req, res) => {

//   const file=req.file;
//   console.log(file)

// //   if(file){
// //   csvtojson()
// //   .fromFile(file)
// //   .then(csvData => {console.log(csvData)})
// //   .then((res)=>{return res.json({
// //     info:"success"
// //   })})
// // }

// //   else{
// //     return res.json({
// //       info:"failure"
// //     })
// //   }

// });



