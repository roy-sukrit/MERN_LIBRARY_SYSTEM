const operationDetail = require('../models/bookOperation.model');
const moment = require('moment');
const fineDetail=require('../models/fineDetail.model')



exports.getBookStatus=(req, res) => {

    const student_id=req.body.Id
    console.log(student_id)
    
  //!DOUBT
    operationDetail.find({Books_Issued:1,student_id:student_id})
    .exec((err,user)=>{
       
      if(user==0){
        return res.json({
                  
          details:`No Active Book Issue `,
          status:0
          
      })
      } 
  
      else{
    
        return res.json({
          details:user,   
          status:1
          
      })
    
    ;
    
      }
    })
    
  };
  

exports.getActiveBookStatus=(req, res) => {
    operationDetail.find({Books_Issued:1})
    .exec((err,user)=>{     
      if(user==0){return res.json({details:[],status:0})} 
      else{return res.json({details:user,status:1});}
    })  
  };
  exports.getIssueStatus=(req, res) => {
    const book_name=req.body.Name
    operationDetail.find({Books_Issued:1,book_name:book_name})
    .exec((err,user)=>{     
      if(user==0){return res.json({details:[]})} 
      else{return res.json({details:user});}
    })  
  };

exports.getFineUsers=(req, res) => {
    operationDetail.find({Books_Issued:1,Fine:{$gt:0}})
    .exec((err,user)=>{     
      if(err||!user){
        return res.json({details:[],status:0})} 
  
      else{
        
        
        return res.json({details:user,status:1});
        
      }
    })  
  };  


exports.issueIncrement=(req, res) => {

    const student_id=req.body.Id
    console.log(student_id)
    const student_name=req.body.Name
    console.log(student_name)
    const ISBN=req.body.ISBN
  
    operationDetail.findOne({student_name:student_name,student_id:student_id, ISBN:ISBN})
    .exec((err,user)=>{
  
      if(err||!user){
        return res.json({
                  
          error:`User does not exist`,
          status:"FAILED"
          
      })
      } 
  
      else{
  
        if(user.Books_Issued==2){
        return res.json({
          error:"Maximun Limit is reached ",
          status:"Only 2 books per user permitted"
        })
      }
        
        else{
  
      
        user.Books_Issued=user.Books_Issued+1
        user.Date_OfIssue=moment().format('YYYY-MM-DD')
        user.Date_OfReturn=moment().add(7,'days').format('YYYY-MM-DD')
  
  
        console.log("isse date:",user.Date_OfIssue)
        console.log("return date:",user.Date_OfReturn)
  
        user  
        .save()
        .then(()=>{res.json("Books Issue Success")})
        .catch(err=>{res.status(400).json(`Error: ${err}`)})
        }
        
        };
      })
    }

exports.returnOperation=(req, res) => {

    const student_id=req.body.Id
    console.log(student_id)
    const student_name=req.body.Name
    console.log(student_name)
    const ISBN=req.body.ISBN
    console.log(ISBN)
  
    operationDetail.findOne({student_name:student_name,student_id:student_id, ISBN:ISBN,Books_Issued:1||2})
    .exec((err,user)=>{
  
      if(err||!user){
        return res.json({
                  
          error:`User does not exist`,
          status:"FAILED"
          
      })
      } 
  
      else{
  
             
        user.Books_Issued=user.Books_Issued-1
      
        user  
        .save()
        .then(()=>{res.json("Books Return Success")})
        .catch(err=>{res.status(400).json(`Error: ${err}`)})
        }
        
        
      })
    }

exports.addOperation=(req, res) => {
    const student_name = req.body.Name;
    const student_id = req.body.Id;
    const ISBN = Number(req.body.ISBN);
    const Books_Issued=req.body.info
    const book_name=req.body.book_name
  
    const operation = new operationDetail({
     student_name,
     student_id,
     ISBN,
     Books_Issued,
     book_name
    });
    console.log(operation)
  
    operation.save()
    .then(() => res.json('Operation  Added! '))
    .catch(err => res.status(400).json('Error: ' + err));
  };    

exports.fineOperation=(req, res) => {

    const student_id=req.body.Id
    console.log(student_id)
    const student_name=req.body.Name
    console.log(student_name)
    const ISBN=req.body.ISBN
    
  
    operationDetail.findOne({student_name:student_name,student_id:student_id, ISBN:ISBN,Books_Issued:1})
    .exec((err,user)=>{
  
      if(err||!user){
        return res.json({error:`No Date found`,status:"FAILED"})
      } 
  
      else{
         const today=moment(moment().format('YYYY-MM-DD'))
         console.log("RETURN DATE",today)
         const due_date=moment(user.Date_OfReturn )       
         console.log("DUE DATE:",due_date )
        
  
         //^return_date- 19th
         //^due_date-29th
  
        if (due_date.isAfter(today)){
          return res.json({info:0})}
        
  
        else{           
        const fine=today.diff(due_date,'days')*10
  
        if(fine===0){
        return res.json({info:0})}
  
        else{     
        user.Fine=fine
        user.save()
        .then(resp=>res.json({info:fine}))
        .catch(err => res.status(400).json('Error: ' + err));
        
        }
      }
      
        
        
        };
  
      })
    }

exports.reIssueOperation= (req, res) => {

    const student_id=req.body.Id
    console.log(student_id)
    const student_name=req.body.Name
    console.log(student_name)
    const ISBN=req.body.ISBN
  
    operationDetail.findOne({student_name:student_name,student_id:student_id, ISBN:ISBN})
    .exec((err,user)=>{
  
      if(err||!user){
        return res.json({
                  
          error:`User does not exist`,
          status:"FAILED"
          
      })
      } 
  
      else{
  
        if(user.Books_Issued==2){
        return res.json({
          error:"Maximun Limit is reached ",
          status:"Only 2 books per user permitted"
        })
      }
        
        else{
  
      
        user.Re_Issue=user.Re_Issue+1
        user.Date_OfIssue=moment().format('YYYY-MM-DD')
        user.Date_OfReturn=moment().add(7,'days').format('YYYY-MM-DD')
  
  
        console.log("isse date:",user.Date_OfIssue)
        console.log("return date:",user.Date_OfReturn)
  
        user  
        .save()
        .then(()=>{res.json("Books Re-Issue Success")})
        .catch(err=>{res.status(400).json(`Error: ${err}`)})
        }
        
        };
      })
    }
    
    
exports.fineDetailOperation=(req, res) => {

    const student_id = req.body.Id;
    const student_name=req.body.Name
    const ISBN = Number(req.body.ISBN);
  
    operationDetail.findOne({student_name:student_name,student_id:student_id, ISBN:ISBN,Books_Issued:1})
    .exec((err,user)=>{
      const Fine=user.Fine
  
      user.Fine=0
      user.save()
    .then(() => res.json('Fine set to 0! '))
    .catch(err => res.status(400).json('Error: ' + err));
  
    const operation = new fineDetail({
     Fine,
     student_id,
     ISBN,
    });
  
    operation.save()
    .then(() => res.json('Fine Detail is Added! '))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  };    

exports.fineUpdateOperation=(req, res) => {

    const student_id = req.body.Id;
    const student_name=req.body.Name
    const fine=req.body.Fine
    const ISBN = Number(req.body.ISBN);
  
    operationDetail.findOne({student_name:student_name,student_id:student_id, ISBN:ISBN,Books_Issued:1})
    .exec((err,user)=>{
  
      if(err||!user){
        return res.json({
                  
          error:`User does not exist`,
          status:"FAILED"
          
      })
      }
      else
      {
     
  
      user.Fine=fine
      user.save()
    .then(() => res.json('Fine Updated! '))
    .catch(err => res.status(400).json('Error: ' + err));
  
    
      }
  });
};  

      
exports.getBooksFinebyDate=(req, res) => {
   const start_date=new Date(req.body.start_date)
   console.log(start_date)
   const end_date=new Date(req.body.end_date)
   console.log(end_date)


  
    operationDetail.find({updatedAt:{$gte:start_date,$lt: end_date},Fine:{$gt:0}})
    .exec((err,user)=>{     
      if(err||user==0){return res.json({details:[]})} 
      else{return res.json({details:user});}
    })  
  };