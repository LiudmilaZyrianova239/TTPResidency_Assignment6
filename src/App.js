import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './component/Home.js';
import UserProfile from './component/UserProfile';
import Login from './component/Login';
import Debit from './component/Debit';
import Credit from './component/Credit';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
        debit: [],        
        addedDebitData: [],
        credit: [],        
        addedCreditData: [],
      }
    }
  }
  mockLogIn = (logInInfo) => {
    const newUser = this.state.currentUser;
    newUser.userName = logInInfo.userName;
    newUser.debit = [];        
    newUser.addedDebitData= []; 
    newUser.credit= [];         
    newUser.addedCreditData= []; 
    this.setState({currentUser: newUser});
  };

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} debit = {this.state.currentUser.debit} addedDebitData={this.state.currentUser.addedDebitData} credit = {this.state.currentUser.credit} addedCreditData={this.state.currentUser.addedCreditData}/>);

    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince}/>
    );
    const DebitComponent = () => (
      <Debit userName={this.state.currentUser.userName} addedDebitData = {this.state.currentUser.addedDebitData} accountBalance={this.state.accountBalance} debit = {this.state.currentUser.debit} credit = {this.state.currentUser.credit}/>
    );
    const CreditComponent = () => (
      <Credit userName={this.state.currentUser.userName} addedCreditData = {this.state.currentUser.addedCreditData} accountBalance={this.state.accountBalance} credit = {this.state.currentUser.credit} debit = {this.state.currentUser.debit}/>
    );
    const LoginComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
      
    return (
      <Router>
        <Switch>
        <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/debit" render={DebitComponent}/>
          <Route exact path="/credit" render={CreditComponent}/>
          
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LoginComponent}/>

          
        </Switch>
      </Router>
    );
  }
}

export default App;
