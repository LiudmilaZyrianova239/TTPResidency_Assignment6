import React, {Component} from 'react';

class AccountBalance extends Component {
  
  render() {
    var balance= (this.props.debit[0]-this.props.credit[0]).toFixed(2);
    return (
        <div>
          Account details: <br/>
          Balance: {balance} <br/>
          Debit: {this.props.debit[0]}<br/>
          Credit: {this.props.credit[0]}<br/>
        </div>
    );
  }
}

export default AccountBalance;