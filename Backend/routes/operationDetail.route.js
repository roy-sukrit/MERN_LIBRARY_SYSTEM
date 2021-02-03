const router = require('express').Router();
const OperationController = require('../controllers/Operation_Controller')

/*
!<------OPERATION ROUTE API ------->

^1. GET BOOK STATUS
&2. BOOK ISSUE INCEREMT AND CHECK MAX 2
*3. ADD DATA TO OPERATION
?4. RETURN BOOK
^5. GET FINE OPERATION
&6. RE-ISSUE OPERATION
*7. ADD FINE TO TABLE OPERATION
&8. GET FINE OPERATION
*9. UPDATE FINE OPERATION
^10. ACTIVE BOOKS STATUS

*/



//*<-------------GET BOOK STATUS------------>
router.post('/check',OperationController.getBookStatus)



//*<-------------GET BOOK ISSUE STATUS BY TITLE------------>
router.post('/issue_status',OperationController.getIssueStatus)

//*<-------------GET ACTIVE BOOK STATUS------------>
router.post('/active',OperationController.getActiveBookStatus)

//*<-------------GET FINE USERS------------>
router.post('/usersFine',OperationController.getFineUsers)

//*<-------------BOOK ISSUE INCEREMT AND CHECK MAX 2 --------->

router.post('/add',OperationController.issueIncrement)

//*<-------------BOOK RETURN  --------->

router.post('/return',OperationController.returnOperation)

//*<--------------ADD DATA TO OPERATION----------------> 

router.post('/add_op',OperationController.addOperation)

//*<-------------------FINE---------------------------->
router.post('/fine',OperationController.fineOperation)


//*<----------------------RE-ISSUE-------------------------------->
router.post('/re_issue',OperationController.reIssueOperation)

//*<--------------Fine Detail Operation----------------->
router.post('/fineDetail',OperationController.fineDetailOperation)

//*<--------------Fine Update Operation----------------->

router.post('/fineUpdate',OperationController.fineUpdateOperation)

//^<----------Getting books with fine by date-------------->
router.post('/fine_date',OperationController.getBooksFinebyDate)


module.exports = router;
