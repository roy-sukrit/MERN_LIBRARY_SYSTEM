import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { Form, Button ,Table,ProgressBar} from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router";
import spinner from "./spinner.gif";
import { useLocation,Link } from "react-router-dom";

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

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media(min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863AB;
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  margin-top:10px;

  &:hover {
    background: #1D3461;
  }
`;



export const UserCheck = (props) => {
    const location=useLocation()
    const history = useHistory();

    const [book,setbook]=useState('')
    const [count,setcount]=useState('')
    const[data,setData]=useState([])
    const [info,setInfo]=useState([])



    // const userDetail=({
    //     Id:location.state.Details.Id,
    //     ISBN:location.state.Details.ISBN
    //  })

    console.log("STATE",location.state)



    const getData=async ()=>{
        const response= await axios.post(`http://localhost:8080/operation/check`,{Id:location.state.Details.Id})
        console.log("RESPONSE",response)




        
        setData(response.data.details)
        setInfo(response.data.status)
        console.log("INFO",info) 
        console.log("DATA",data)// setcount(state.count.count())
        //   .then(res=>console.log("check",res.data))
    
        }


    useEffect(() => {
       
            
        getData()
    }, [])

   
    


    
    return (
      <CONTAINER className="container">
        <h1>Your Account is : {location.state.status}</h1>

        <h1>Book Details</h1>
        <h1>Title:{location.state.title}</h1>
        <h1>Author:{location.state.author}</h1>
        <h1>ISBN:{location.state.ISBN}</h1>

        
            
           { info== 0 ? (
          
            <div>
                <h1>No Active Issue </h1>
                <div className="container mx-10">
                  <ProgressBar striped variant="success" now={100} />
                </div>
                <BUTTON variant="primary" onClick={(e)=>{
                  e.preventDefault()
                  history.push({
                    pathname: "/issueDetails",
                    state: {
                      status: "Approved",
                      title: location.state.title,
                      author: location.state.author,
                      ISBN: location.state.ISBN,
                      Details: location.state.Details,
                    },
                  })
                }}>
                  Proceed to Issue
                </BUTTON>
                
    
               
            </div>
          
        ) : (

          <div>
          <div className="container mx-10">
                  <ProgressBar striped variant="success" now={100} />
                </div>
         
              
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th>Date of Issue </th>
                      <th> Date of Return</th>
                      <th>Fine </th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {console.log("Before mapping",data)}
                  

                  {
                      data.map((el,key)=>(
                        <tr key={key}>
                        <td> {el.book_name}</td>
                        <td>{el.Date_OfIssue} </td>
                        <td> {el.Date_OfReturn}</td>
                        {el.Fine==0?
                          <td>0</td>
                          :
                          <td>
                            <td>{el.Fine}/-</td>
                            <td><button className="btn btn-danger"

                            onClick={async (e)=>{
                              e.preventDefault()
                                const FineDetails=({
                                Name:el.student_name,
                                Id:el.student_id,
                                ISBN:el.ISBN,
                              })
                              console.log(FineDetails)
                              const response=await axios.post(`http://localhost:8080/operation/fineDetail`,FineDetails);
                              console.log(response)


                              axios.post(`http://localhost:8080/operation/return`,FineDetails)
                              .then(res=>res.json)
              
                              //&-------BOOK UPDATE---->
              
                              axios.post(`http://localhost:8080/books/status`,{ISBN:el.ISBN})
                              .then(res=>res.json)
                              getData();
                                          
                            }
                          }
                            
                            >Clear & Return</button> </td>
                            

                            </td>
                        
                        } 
                      </tr>
                      ))}

                  
                

                
                  
                  </tbody>
                </Table>


                {
                  
                  
                  data.length===2?(
                 <div>
                   <h1>Cannot Issue More than 2</h1>
                   <div className="container mx-10">
                    <ProgressBar striped variant="danger" now={100} />
                  </div>
                 </div>
                
                ):(
                <BUTTON variant="primary" onClick={(e)=>{
                  e.preventDefault()
                  history.push({
                    pathname: "/issueDetails",
                    state: {
                      status: "Approved",
                      title: location.state.title,
                      author: location.state.author,
                      ISBN: location.state.ISBN,
                      Details: location.state.Details,
                    },
                  })
                }}>
                  Proceed to Issue
                </BUTTON>
                )}
           
          </div>
        )}
        


      </CONTAINER>
    );
}




