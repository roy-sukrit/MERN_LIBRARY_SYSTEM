const router = require('express').Router();
const UserController=require('../controllers/User_Controller')


/*
!<------STUDENT DETAILS ROUTE API ------->

^1. FIND STUDENTS
&2. ADD STUDENT DETAILS
*3. APPROVE STUDENT
?4. CHECK IF APPROVED

*/

//*<--------------FIND STUDENTS------------>
router.get('/',UserController.findAllStudents)


//*<-----------ADD STUDENT DETAILS----------->
router.post('/add',UserController.addStudentDetails)

//*<--------------APPROVE STUDENT-------------->
router.post('/approve/:id',UserController.approveStudent)


//*<----------------CHECK IF APPROVED----------------->
router.post('/verify',UserController.checkApproval)






module.exports = router;
