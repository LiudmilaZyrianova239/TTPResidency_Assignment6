// src/components/Home.js
    
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
   
class Home extends Component {
    render() {
        console.log(this.props.debit);
    return (
        <div>
            <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
            <h1>Bank of React</h1>
            <Link to="/userProfile">User Profile</Link> <br/> <br/>
            Click here to update debit balance, look at displayed debits, and update them: <Link to="/debit">Debit</Link> <br/>
            Click here to update credit balance, look at displayed credits, and update them: <Link to="/credit">Credit</Link> <br/>   <br/>

            <AccountBalance accountBalance={this.props.accountBalance} debit={this.props.debit} credit={this.props.credit} /> <br/>
            <Link to="/login">Login</Link>
        </div>
    );
    }
}
    
export default Home;