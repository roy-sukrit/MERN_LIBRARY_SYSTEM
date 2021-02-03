import React,{useEffect,useState} from 'react'
import { Table, Button,Form,Col } from 'react-bootstrap';
import axios from 'axios'
import { Link} from "react-router-dom";
const moment = require('moment');



export const Fine = () => {

const[data,setData]=useState([])
const[fine,setFine]=useState(0)


// const [countryList, setCountryList] = useState();





const getData = async ()=>{  
  //^ Getting the books  
  const response = await axios.post('http://localhost:8080/operation/usersFine')
  setData(response.data.details)
 
  }


useEffect(() => {  
  getData()

      
  }, [])

  console.log("DATA",data)


const handleChange=(e)=>{
//^Trik
    e.preventDefault(
        setFine(e.target.value)
    )
}
    return (

        <div className="container">
       
        <hr/>
        <h1>Fine Status</h1>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Student Id</th>
      <th>Issue Date</th>
      <th>Return Date</th>
      <th>Fine</th>
      <th>Update Fine</th>
      <th>ISBN</th>
    </tr>
  </thead>
  <tbody>

  {
      
    
    data.map((book,key)=>{

    return (
      <tr key={key}>
        <td>{book.student_id} </td>
        <td>{book.Date_OfIssue}</td>
        <td>{moment.utc(book.Date_OfReturn).format('MM/DD/YYYY')}</td>

        <td>{book.Fine}</td>
        <td>
          <form>
            <label className="sr-only" htmlFor="inlineFormInput">
              Fine
            </label>
            <input
              type="number"
              className="form-control mb-2"
              id="fine"   
              placeholder="fine"
              value={fine}
              onChange={handleChange}
            />
            <div className="col-auto">
            {fine>book.Fine?<button  className="btn btn-primary mb-2" disabled>Submit</button>:
              <button type="submit" className="btn btn-primary mb-2" onClick={async (e)=>{
                e.preventDefault()  
                const fineDetails=({
                    Name:book.student_name,
                    Id:book.student_id,
                    ISBN:book.ISBN,
                    Fine:fine
                  })

                const response=await axios.post(`http://localhost:8080/operation/fineUpdate`,fineDetails);
                console.log(response)                
                getData()
                setFine(0)
            
            
            }}>
                Submit
              </button>
          }
            </div>
          </form>
        </td>

        <td>{book.ISBN}</td>
      </tr>
    );



  })}
   
   
   
  </tbody>
</Table>
            
        </div>
    )
}




        // {/*e.preventDefault()
        // axios.post(`http://localhost:8080/books/status`,{ISBN:book.ISBN})
        // getData()*/}