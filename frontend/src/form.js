import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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


  Address: Yup.string()
  .min(2, "*Address must have at least 2 characters")
  .max(100, "*Address can't be longer than 100 characters")
  .required("*Address is required"),
//   email: Yup.string()
//   .email("*Must be a valid email address")
//   .max(100, "*Email must be less than 100 characters")
//   .required("*Email is required"),
Id: Yup.string()
  .min(6, "*ID must have at least 6 digits")
  .max(6, "*ID can't be longer than 6 digits")
  
  .required("*id_no number required"),
//   blog: Yup.string()
//   .url("*Must enter URL in http://www.example.com format")
//   .required("*URL required")
});

const SignupForm = (props) => {

  return (
    <CONTAINER className="container">
       <Formik
        initialValues={{ Name:"", Address:"", Id:"", }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true);


        console.log(values)
        
        axios.post('http://localhost:8080/user/add', values)
        .then(res => console.log(res.data));

        resetForm();
        setSubmitting(false);
            // Simulate submitting to database, shows us values submitted, resets form
         
        
            
        }}
      >
        {/* Callback function containing Formik state and helpers that handle common form actions */}
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <MYFORM onSubmit={handleSubmit} className="mx-auto">
        <h1>Register</h1>
        
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
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
              ): null}
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Address :</Form.Label>
            <Form.Control
              type="text"
              /* This name property is used to access the value of the form element via values.nameOfElement */
              name="Address"
              placeholder="Address"
              /* Set onChange to handleChange */
              onChange={handleChange}
              /* Set onBlur to handleBlur */
              onBlur={handleBlur}
              /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
              value={values.Address}
              /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
              className={touched.Address && errors.Address ? "error" : null}
              />
              {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
              {touched.Address && errors.Address ? (
                <div className="error-message">{errors.Address}</div>
              ): null}
          </Form.Group>
          <Form.Group controlId="formid_no">
            <Form.Label>id_no :</Form.Label>
            <Form.Control
              type="text"
              name="Id"
              placeholder="unique 6 digit ID"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Id}
              className={touched.Id && errors.Id? "error" : null}
              />
              {touched.Id && errors.Id ? (
                <div className="error-message">{errors.Id}</div>
              ): null}
          </Form.Group>
          
          <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </BUTTON>
        </MYFORM>
      )}
      </Formik>
    </CONTAINER>
  );
}


export default SignupForm ;

