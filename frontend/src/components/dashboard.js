import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const moment = require('moment');





export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fineDetail,setFineDetail]=useState([])

  const [unique_data, set_uniquedata] = useState([]);
  const[issueDetail,setIssueDetail]=useState([]);

  const [active, setActive] = useState([]);
  const [info, setInfo] = useState([]);

  const getData = async () => {
    //^ Getting the books
    const response_unique_book = await axios.get("http://localhost:8080/books/unique_books");
    set_uniquedata(response_unique_book.data);
    console.log("unique:", unique_data);


    const response_book = await axios.get("http://localhost:8080/books");
    setData(response_book.data);
    console.log("dashboard:", data);

    

    const response_issue = await axios.post(
      "http://localhost:8080/operation/active"
    );
    setActive(response_issue.data.details);
    console.log("ACTIVE", active);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <br />

      <div className="row">
        <div className="col">
          <div className="col-md">
            <div
              className="card text-center text-white  mb-3"
              id="total-orders"
            >
              <div className="card-header" style={{ backgroundColor: "green" }}>
                <h5 className="card-title">Total Books</h5>
              </div>
              <div className="card-body text-black" style={{ color: "green" }}>
                <h3 className="card-title">{data.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="col-md">
            <div
              className="card text-center text-white  mb-3"
              id="orders-delivered"
            >
              <div className="card-header" style={{ backgroundColor: "red" }}>
                <h5 className="card-title">Books Issued</h5>
              </div>
              <div className="card-body" style={{ color: "red" }}>
                <h3 className="card-title">{active.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="col-md">
            <div
              className="card text-center text-white  mb-3"
              id="orders-pending"
            >
              <div className="card-header" style={{ backgroundColor: "blue" }}>
                <h5 className="card-title">Books Available</h5>
              </div>
              <div className="card-body" style={{ color: "blue" }}>
                <h3 className="card-title">{data.length - active.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-5">
          <h5>Books:</h5>
          <hr />
          <div className="card card-body">
            <a className="btn btn-primary  btn-sm btn-block">Add Book</a>
            <table className="table table-sm">
              <tr>
                <th>Report</th>
                <th>Title</th>
              
              </tr>
              <tbody>
              {console.log("UNIQUE",unique_data)}

                {unique_data.map((book, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={async (e) => {
                            e.preventDefault();
                            let name={book}
                            let status_book = {
                              Name: name.book,
                            };

                            const details = await axios.post(
                              "http://localhost:8080/books/by_Title",
                              status_book
                            );
                            console.log(details)
                            setInfo(details.data);

                            const issue_details = await axios.post(
                              "http://localhost:8080/operation/issue_status",
                              status_book
                            );
                            console.log("ISSUE DETAILS",issue_details)
                            setIssueDetail(issue_details.data.details)
                            console.log("Issue Detail",issueDetail)

                            console.log("Info", info);
                          }}
                        >
                          View
                        </button>
                      </td>
                    
                      <td>{book}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-7">
          <h5>Report</h5>
          <hr />
          <div className="card card-body">
            <table className="table table-sm">

            
              <thead>
              <tr>
              <th>Status</th>
              <th>ISBN</th>
              <th>Book Title</th>
              <th>Author</th>
            
            </tr>
          </thead>

          {console.log("before Mapping", info)}

          <tbody>
            
                

             { info.length===0?
                <tr><td style={{color:"red"}}>No Issues</td></tr>
                :
                
                info.map((el, key) => {
                return <tr key={key}>
                    <td >{el.book_status===0?<b style={{color:"red"}}>Not Available</b>:
                    <b style={{color:"green"}}>Available</b>}</td>
                    <td>{el.ISBN}</td>
                    <td>{el.bookTitle}</td>
                    <td>{el.bookAuthor}</td>
                   <td></td>
                  </tr>
                  
              })

                }
              
              
            
               
                
              </tbody>
             
            </table>
            <hr/>
            <footer><h4>
             Total Copies: {info.length} 
            </h4>
            </footer>
            <hr/>
            <h5 style={{color:"blue"}}><b>Borrower Info</b>:</h5>
            <table className="table table-sm">
             
            
            <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Return Date</th>
            <th>Fine</th>
          
          </tr>
        </thead>

        {console.log("before issue Mapping", issueDetail)}

        <tbody>
          
              

           { issueDetail.length===0?
              <tr><td style={{color:"red"}}>No Issues</td></tr>
              :
              
              issueDetail.map((el, key) => {
              return <tr key={key}>
                  <td >{el.student_id}</td>
                  <td>{el.student_name}</td>
                  <td>{moment.utc(el.Date_OfReturn).format('MM/DD/YYYY')}</td>
                  <td>{el.Fine}</td>
                 <td></td>
                </tr>
                
            })

              }
            
            </tbody>
           
          </table>
          </div>

          <h5 style={{color:"blue"}}><b>Search Fine</b>:</h5>
          <table className="table table-sm">
           
          
          <thead>
          <tr>
        
            <th>Start Date 
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </th>
            <button className="btn btn-primary" onClick={async (e)=>{

              e.preventDefault()

              const fine_range=({
                start_date:startDate,
                end_date:endDate
              })

              const fine_details = await axios.post(
                "http://localhost:8080/operation/fine_date",
                fine_range
              );

              setFineDetail(fine_details.data.details)
              


            }}
            
            
            
            >Search</button>
            <th>End Date 
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
            </th>
            <th></th>
         
         
        
        </tr>
      <tr>
      
      </tr>
      <br/>
        
        <tr >
          <th>Id</th>
          <th>Name</th>
          <th>DoR</th>
          <th>Fine</th>
          <th></th>
        </tr>

        
      </thead>

      {console.log("before date ", startDate,endDate)}

      <tbody>
        
            

         { fineDetail.length===0?
            <tr><td style={{color:"red"}}>No Users</td></tr>
            :
            
            fineDetail.map((el, key) => {
            return <tr key={key}>
                <td >{el.student_id}</td>
                <td>{el.student_name}</td>
                <td>{moment.utc(el.Date_OfReturn).format('MM/DD/YYYY')}</td>
                <td>{el.Fine}</td>
               
              </tr>
              
             })
            }

            
          
          </tbody>
         
        </table>
          

          
        </div>


        
      </div>
    </div>
  );
};
