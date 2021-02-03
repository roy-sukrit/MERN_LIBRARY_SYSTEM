import React,{useEffect,useState} from 'react'
import { Table, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link} from "react-router-dom";
import SearchBar from './searchBar'

export const Books = (props) => {

const[data,setData]=useState([])
const [input, setInput] = useState('');
const [dataDefault, setdataDefault] = useState();



const getData = async ()=>{  
  //^ Getting the books  
  const response = await axios.get('http://localhost:8080/books')
  setData(response.data)
  setdataDefault(response.data)
  }


useEffect(() => {  
  getData()    
  }, [])

  console.log("DATA",data)

  const updateInput = async (input) => {
    const filtered = dataDefault.filter(data => {
     return data.bookCategory.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setData(filtered);
  }

    return (

   

        <div className="container">
     
        <SearchBar
         input={input}
         onChange={updateInput}/>
        <hr/>
        <h1>BOOKS</h1>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Issue?</th>
      <th>Book Title</th>
      <th>Book Author</th>
      <th>ISBN</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>

  {data.map((book,key)=>{

    return <tr key={key}>
    <td>    
  {/*<-------------PASSING THE BOOK _ID TO ISSUE COMPONENT-------------->*/}
    {book.book_status===1?
      
      <Link to={`/issue/${book._id}`}><Button>Issue</Button></Link>:
      <Link
      to={`/return/${book._id}`}><button className="btn btn-danger">Return</button></Link> 
    }
  
    </td>
    <td>{book.bookTitle}</td>
    <td>{book.bookAuthor}</td>
    <td>{book.ISBN}</td>
    <td>{book.bookCategory}</td>
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