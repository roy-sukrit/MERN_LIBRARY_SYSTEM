import React, { Component } from 'react'
import { Link} from "react-router-dom";




 export default class Navbar extends Component {

    constructor(props){
        super(props)

        
    }
    
    render() {

        return (
          
            <div className="container my-100">
            
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container my-20">
              <Link className="navbar-brand" to={"/"}> </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">


                <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>Dashboard </Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/activeIssues"}>Active </Link>
              </li>

              <li className="nav-item">
              <Link className="nav-link" to={"/Fine"}>Fine </Link>
            </li>

               
              <li className="nav-item">
                <Link className="nav-link" to={"/operation"}>Status</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to={"/addBook"}>Add Book</Link>
                </li>
              
                <li className="nav-item">
                  <Link className="nav-link" to={"/books"}>Books</Link>
                </li>
              
               
            
        
                
                

                </ul>
              </div>
            </div>
          </nav>
                
            </div>
        )
    }
}




