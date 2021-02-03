import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Button , Alert} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import { Modals } from "./modal";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media (min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
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

export const Return = (props) => {
  const history = useHistory();
  const location=useLocation()
  const ReturnDate= new Date(Date.now()+ 7 * 86400000).toString()
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [fine, setFine] = useState(0);
  // const[flag,setFlag]=useState(false)
  const [status, setStatus] = useState("");


  const getData = async () => {

    
    const response = await axios.get(
      `http://localhost:8080/books/${props.match.params.id}`
    );
    console.log(response);
    setTitle(response.data.bookTitle);
    setAuthor(response.data.bookAuthor);
    setISBN(response.data.ISBN);
  };

  useEffect(() => {   
    getData();
  }, []);

  return (
    <>
      <CONTAINER className="container">
        <Formik
          initialValues={{ Name: "", Id: "", ISBN: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);
            resetForm();
            console.log("CLICK")
           
            
              
             


           
          }}

          
        >
          {/* Callback function containing Formik state and helpers that handle common form actions */}
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <MYFORM onSubmit={handleSubmit} className="mx-auto">
              <h1>Book Return</h1>
              <h1>Today's Date :{ReturnDate}</h1>

              <Form.Group controlId="formName">
                <Form.Label> Your Name :</Form.Label>
                <Form.Control
                  type="text"
                  /* This name property is used to access the value of the form element via values.nameOfElement */
                  name="Name"
                  placeholder="Full Name"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.Name}
                  /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                  className={touched.Name && errors.Name ? "error" : null}
                />
                {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                {touched.Name && errors.Name ? (
                  <div className="error-message">{errors.Name}</div>
                ) : null}
              </Form.Group>

              <Form.Group controlId="formid_no">
                <Form.Label>Your Id :</Form.Label>
                <Form.Control
                  type="text"
                  name="Id"
                  placeholder="unique 6 digit ID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Id}
                  className={touched.Id && errors.Id ? "error" : null}
                />
                {touched.Id && errors.Id ? (
                  <div className="error-message">{errors.Id}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formid_no" disabled={true}>
                <Form.Label>ISBN :</Form.Label>
                <Form.Control
                  type="ISBN"
                  name="ISBN"
                  placeholder={isbn}
                  onChange={handleChange}
                  value={isbn}
                />
              </Form.Group>
              <BUTTON variant="danger" type="submit"onClick={async (e)=>{
                e.preventDefault();

                const operationDetails=({
                  Name:values.Name,
                  Id:values.Id,
                  ISBN:isbn,
                })


 
                console.log(operationDetails)
                //^----RETURN---->

                axios.post(`http://localhost:8080/operation/return`,operationDetails)
                .then(res=>res.json)

                //&-------BOOK UPDATE---->

                axios.post(`http://localhost:8080/books/status`,{ISBN:isbn})
                .then(res=>res.json)
                getData();
                

              }} >
                Return
              </BUTTON>
              
                  <BUTTON className="btn btn-primary"  style={{margin:"7px"}} onClick={async (e)=>{
                    e.preventDefault();
    
                    const operationDetails=({
                      Name:values.Name,
                      Id:values.Id,
                      ISBN:isbn,
                    })
    
    
     
                    console.log(operationDetails)
                    //^----RETURN---->
                    
                    axios.post(`http://localhost:8080/operation/re_issue`,operationDetails)
                    .then(res=>res.json)
    
                  
    
                  }} >
                    Re-Issue?
                  </BUTTON>


                  <BUTTON className="btn btn-primary"style={{margin:"7px"}}  onClick={async (e)=>{
                    e.preventDefault()
                      const fineDetails=({
                      Name:values.Name,
                      Id:values.Id,
                      ISBN:isbn,
                    })
                    console.log(fineDetails)
                    const response=await axios.post(`http://localhost:8080/operation/fine`,fineDetails);
                   setFine(response.data.info)

                    
                  }}>



                  Check Fine: <p>{fine}</p>
                </BUTTON>

                
                <BUTTON className="btn btn-primary"style={{margin:"7px"}}  onClick={async (e)=>{
                  e.preventDefault()
                    const FineDetails=({
                    Name:values.Name,
                    Id:values.Id,
                    ISBN:isbn,
                  })
                  console.log(FineDetails)
                  const response=await axios.post(`http://localhost:8080/operation/fineDetail`,FineDetails);
                  console.log(response)

                  
                }}>



                 Fine Cleared
              </BUTTON>
        
            </MYFORM>
          )}
        </Formik>
      </CONTAINER>
    </>
  );
};
