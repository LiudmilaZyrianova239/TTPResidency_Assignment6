// src/components/Home.js
    
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import './component.css';
   
class Home extends Component {
    render() {
        console.log(this.props.debit);
    return (
        <div >
            {/* <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/> */}
            <h1 className= "App-header">Bank of React</h1>
            <h2 className= "Sub-header">Home</h2>
            <div className = "homePage">
            <div className = "button"> 
                <Link className = "linkText" to="/login">Login</Link>
            </div>
            <div className = "button"> 
                <Link className = "linkText" to="/userProfile">User Profile</Link> 
            </div> <br/>
            Click Debit Button to update debit balance, look at displayed debits, and update them: 
            <div className = "button"> 
                <Link className = "linkText"  to="/debit">Debit</Link> <br/>
            </div>
            Click Credit Button to update credit balance, look at displayed credits, and update them: 
            <div className = "button"> 
                <Link className = "linkText" to="/credit">Credit</Link> <br/> 
            </div>
            <br/>
            <AccountBalance accountBalance={this.props.accountBalance} debit={this.props.debit} credit={this.props.credit} /> <br/>
            </div>
        </div>
    );
    }
}
    
export default Home;