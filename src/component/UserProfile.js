// src/components/UserProfile.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './component.css';

class UserProfile extends Component {
  render() {
    return (
        <div>
            <h1 className= "App-header">Bank of React</h1>
            <h2 className= "Sub-header">User Profile</h2> 
            <div className = "homePage">
              <div>Username: {this.props.userName}</div> <br/>
              <div>Member Since: {this.props.memberSince}</div> <br/>
              <div className = "button"> 
              <Link className = "linkText" to="/">Home</Link> 
              </div>
            </div>  
        </div>
    );
  }
}

export default UserProfile;