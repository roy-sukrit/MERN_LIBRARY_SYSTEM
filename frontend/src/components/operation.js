import React,{useEffect,useState} from 'react'
import { Table, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link} from "react-router-dom";


export const Operation = () => {

const[data,setData]=useState([])



const getData = async ()=>{  
  const response = await axios.get('http://localhost:8080/user')
  setData(response.data)
  console.log("DATA RUN")
  }

useEffect(() => { 
  getData()    
  console.log("EFFECT RUN")
  }, [])


  const handleClick=(id,e)=>{
    e.preventDefault()
    

    axios.post( `http://localhost:8080/user/approve/${id}`)
    .then(res => console.log(res.data));
    getData()
     
  }

    return (
      
        <div className="container">
        <hr/>
        <h2>STUDENTS STATUS</h2>
        <Table striped bordered hover>
  <thead>
 
    <tr>
      <th>Actions</th>
      <th>Student Name</th>
      <th>Student Id</th>
      <th>Approve Status</th>
    </tr>
  </thead>
  <tbody>

  {data.map((user,key)=>{

    return <tr key={key}>
     <td>{user.approve===0?
      <button className="btn btn-primary" onClick={(e)=>handleClick(user._id,e)}>Approve?</button>
     :
     <button className="btn btn-danger" onClick={(e)=>handleClick(user._id,e)}>Reject?</button>
     }
     </td>
     
     
    <td>{user.studentName}</td>
    <td>{user.id_Number}</td>
    <td>{user.approve===0?"Not Approved":"Approved!"}</td>
  </tr>



  })}
   
   
   
  </tbody>
</Table>
            
        </div>
    )
}
