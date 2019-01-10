// Login.js
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';
import './component.css';

class Login extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        userName: '',
        password: '',
        debit: [],        
        addedDebitData: [],
        credit: [],        
        addedCreditData: [],
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>)
    }

    return (
      <div >
      <h1 className= "App-header">Bank of React</h1>
      <h2 className= "Sub-header">Login</h2>
      <div className = "homePage , loginForm">
      <form onSubmit={this.handleSubmit}>
          <div>
            <label  htmlFor="userName">User Name:</label>
            <input type="text" classname="name" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" classname="name" name="password" />
          </div>
          <button className="submit" >Log In</button>
        </form>
      </div>

        <div className = "homePage"  >
        <div className = "button"> 
                <Link className = "linkText" to="/">Home</Link> 
          </div>
        </div>

      </div>
    )
  }
}

export default Login;