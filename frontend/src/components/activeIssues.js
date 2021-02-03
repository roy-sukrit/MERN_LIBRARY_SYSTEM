import React,{useEffect,useState} from 'react'
import { Table, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link} from "react-router-dom";


export const ActiveIssue = () => {

const[data,setData]=useState([])


// const [countryList, setCountryList] = useState();





const getData = async ()=>{  
  //^ Getting the books  
  const response = await axios.post('http://localhost:8080/operation/active')
  setData(response.data.details)
 
  }


useEffect(() => {  
  getData()

      
  }, [])

  console.log("DATA",data)



    return (

        <div className="container">
       
        <hr/>
        <h1>Active Issues</h1>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Student Id</th>
      <th>Issue Date</th>
      <th>Return Date</th>
      <th>Fine</th>
      <th>ISBN</th>
    </tr>
  </thead>
  <tbody>

  {data.map((book,key)=>{

    return <tr key={key}>
    <td>{book.student_id}   </td>
    <td>{book.Date_OfIssue}</td>
    <td>{book.Date_OfReturn}</td>
    <td>{book.Fine}</td>
    <td>{book.ISBN}</td>
  </tr>



  })}
   
   
   
  </tbody>
</Table>
            
        </div>
    )
}




        // {/*e.preventDefault()
        // axios.post(`http://localhost:8080/books/status`,{ISBN:book.ISBN})
        // getData()*/}