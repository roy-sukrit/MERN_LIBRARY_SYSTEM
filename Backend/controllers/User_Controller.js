const studentDetail = require('../models/studentDetail.model');


exports.findAllStudents=(req, res) => {
    studentDetail.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  };

exports.addStudentDetails=(req, res) => {
    const studentName = req.body.Name;
    const studentAddress = req.body.Address;
    const id_Number = Number(req.body.Id);
  
    const newStudentDetail = new studentDetail({
     studentName,
     studentAddress,
     id_Number
    });
    console.log(newStudentDetail)
  
    newStudentDetail.save()
    .then(() => res.json('User Detail Added! '))
    .catch(err => res.status(400).json('Error: ' + err));
  };
  
exports.approveStudent=(req, res) => {


    studentDetail.findById(req.params.id)
    .then((user) => {
  
    user.approve=!user.approve
  
    user  
    .save()
    .then(()=>{res.json("Aprroval Update Success")})
    .catch(err=>{res.status(400).json(`Error: ${err}`)})
    
    
    });
  
  }

exports.checkApproval=(req, res) => {

    const id_Number=Number(req.body.Id)
    const studentName=req.body.Name
   
  
    studentDetail.findOne({id_Number:id_Number,studentName:studentName})
    .exec((err,user) => {
  
      console.log("VERIFY",req.body.Id)
      if(err||!user){
        return res.json({
                  
          error:`User does not exist. Please signup`,
          status:"FAILED"
          
      })
      } 
  
     else{ 
  
    if(user.approve===0){
    return res.json({
      error:`Not Approved`,
      status:"Not Aprroved yet!"
    })
  }
  
  else{
  
    return res.status(200).json({
      name:user.name,
      id:user.student_id,    
      status:"Approved"
    })
  
  }
     }
  
    
    
    });
  
  }
  
    