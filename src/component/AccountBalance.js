import React, {Component} from 'react';
import './component.css';

class AccountBalance extends Component {
  
  render() {
    var balance= (this.props.debit[0]-this.props.credit[0]).toFixed(2);
    return (
        <div className = "accountBox">
          <h3 classname = "accountBoxHeader">Account details:</h3>
          Balance: {balance} <br/>
          Debit: {this.props.debit[0]}<br/>
          Credit: {this.props.credit[0]}<br/>
        </div>
    );
  }
}

export default AccountBalance;