import React ,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Modals} from './modal'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";

const CONTAINER = styled.div`
  background: #F7F9FA;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media(min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24B9B6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24B9B6;
    padding-top: .5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #FF6565;
  }

  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
`;


const BUTTON = styled(Button)`
  background: #1863AB;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1D3461;
  }
`;

// Schema for yup
const validationSchema = Yup.object().shape({
  Name: Yup.string()
  .min(2, "*Names must have at least 2 characters")
  .max(100, "*Name can't be longer than 100 characters")
  .required("*Name is required"),
  
Id: Yup.string()
  .min(6, "*ID must have at least 6 digits")
  .max(6, "*ID can't be longer than 6 digits")
  
  .required("*id_no number required"),

});

export const IssueDetails = (props) => {
 const location=useLocation()
const [info,setInfo]=useState('')
const [book,setbook]=useState('')
const IssueDate = new Date(Date.now()).toString();
const history = useHistory();

const ReturnDate= new Date(Date.now()+ 7 * 86400000).toString()


   console.log("State",location.state)


   const userDetail=({
      Id:location.state.Details.Id,
      ISBN:location.state.ISBN
   })
    useEffect(() => {

      let getData = async ()=>{
        const response =await axios.post(`http://localhost:8080/operation/check`,userDetail)       
        console.log("CHECK",response)
        setInfo(response.data.info)
        setbook(response.data.book)
        
      }
      getData()
     

    
    }, [info])


    const handleSubmit=(e)=>{
      e.preventDefault()
       if(info===2){
         console.log("Error! Maximum Limit is 2 books per user")
       }
       else{

        const operationDetails=({
          Name:location.state.Details.Name,
          Id:location.state.Details.Id,
          ISBN:location.state.ISBN,
        })

        console.log(operationDetails)
         axios.post(`http://localhost:8080/operation/add`,operationDetails)
         .then(res=>res.json)

         axios.post(`http://localhost:8080/books/status`,{ISBN:location.state.ISBN})
         .then(res=>res.json)



         return history.push('/books')

        



       }
    }

  
  return (
   
    <CONTAINER className="container">
    <h1>ISSSUE DETAILS</h1>
    <h1>Your Account is : {location.state.status}</h1>
    
    <h1>
      Book Details

      </h1>
        <h1>
          Title:{location.state.title}
        </h1>
        <h1>
          Author:{location.state.author}
        </h1>
        <h1>
          ISBN:{location.state.ISBN}
        </h1>
     
         
         <h1>Date of Issue:{IssueDate}</h1>
         <h1>Date of Return :{ReturnDate}</h1>
    
   
         <BUTTON variant="primary"  onClick={handleSubmit} >
         Confirm Issue?
       </BUTTON>
     
    </CONTAINER>
   

  );
 
}




