import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('http://localhost:8080/auth/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })

                localStorage.setItem('status',true)

                    this.setState({
                        redirectTo: '/books'
                    })


                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
        
        if (this.state.redirectTo) {
            {console.log("REDIRECT",this.state.redirectTo)}
            return <Redirect to={{ pathname: this.state.redirectTo }} />

        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={this.handleSubmit}
                                type="submit">Login</button>

                                <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={(e)=>{
                                    e.preventDefault()
                                    console.log("Click")
                                    axios.get(
                                        "http://localhost:3000/auth/google",
                                     
                                    );
                                }}
                                >Login with google</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
