import './App.css';
import Form from './form'
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import {Books} from './components/Books'
import {Issue} from './components/Issue'
import Navbar from './components/navbar'
import {Operation}  from './components/operation'
import {IssueDetails} from './components/issueDetails'
import {Return} from './components/return'
import {UserCheck} from './components/userCheck'
import {AddBook} from './components/addBook.js'
import {ActiveIssue}  from './components/activeIssues'
import {Fine} from './components/Fine'
import {Dashboard} from './components/dashboard'
import axios from 'axios'
import Signup from './components/auth/sign-up'
import LoginForm from './components/auth/login-form'
import NavbarPassport from './components/auth/navbar'
import Home from './components/auth/home'
import {ProtectedRoute} from './components/auth/protected.route'



class App extends Component{
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('http://localhost:8080/auth/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }



render (){
  return (
    <Router>
    	<div className="App">
     <div className="container">       
          <h1>WELCOME TO LIBRARY</h1>
     </div>
     <NavbarPassport updateUser={this.updateUser} loggedIn={this.state.loggedIn} 
     
     />
     

        <Switch>
          <ProtectedRoute path="/" exact component={Form}/>
          <ProtectedRoute path="/books" exact component={Books} />
          <ProtectedRoute path="/issue/:id" exact component={Issue} />
          <ProtectedRoute path="/operation" exact component={Operation} />
          <ProtectedRoute path="/issueDetails" exact component={IssueDetails} />
          <ProtectedRoute path="/return/:id" exact component={Return} />
          <ProtectedRoute path="/userCheck" exact component={UserCheck} />
          <ProtectedRoute path="/addBook" exact component={AddBook} />
          <ProtectedRoute path="/activeIssues" exact component={ActiveIssue} />
          <ProtectedRoute path="/Fine" exact component={Fine} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />      

          {/**this.state.loggedIn &&
            <p>You are Logged in, {this.state.username}!</p>
          **/}        
          <Route path="/login"  render={() => <LoginForm updateUser={this.updateUser}/>}/>
          <Route path="/signup" render={() =><Signup/>}/>
        </Switch>    
    	</div>
    </Router>
  );
 }
}

export default App;
