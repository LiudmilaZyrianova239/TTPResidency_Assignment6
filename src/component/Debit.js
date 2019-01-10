// src/component/Debit.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AccountBalance from './AccountBalance';

class EveryDebit extends Component {
    render() {
        var {
            id,
            description,
            amount,
            date,
        } = this.props.data;

        return (
            <li>
                <p>Description: {description} </p>
                <p>Amount: {amount} </p>
                <p>Date: {date} </p>
            </li>
        );
    }
}



class Debit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCounter: this.props.addedDebitData.length,
            temporaryDescription : "Enter your description here",
            temporaryAmount : "Enter your amount here",
            temporaryDate : "12345678910",
            fetchData: [],
            addedData : this.props.addedDebitData,
            totalDebitArray : this.props.debit,
            totalDebit : this.props.debit[0],
            newDebitNumber: 0,
            newDebit: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeDesctiption = this.handleChangeDesctiption.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
    }


    handleClick() {
        var tempDate = new Date();
        var tdate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +'T'+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();             
        var newDebitElement =  {
            "id": this.state.idCounter,
            "description": this.state.temporaryDescription,
            "amount": this.state.temporaryAmount,
            "date": tdate,
        };

        var totalDebit = this.state.totalDebit;
        totalDebit = totalDebit + (parseFloat(newDebitElement.amount));
        var totalDebitArray = this.state.totalDebitArray;
        totalDebitArray[0] = totalDebit;

        var newAddedData = this.state.addedData;
        newAddedData.push(newDebitElement);
        
        var newID = this.state.idCounter + 1;  

        this.setState({
            kek : 9,
            totalDebit: totalDebit,
            totalDebitArray: totalDebitArray,
            idCounter: newID,
            addedData: newAddedData,
            temporaryDescription : "Enter your decription here",
            temporaryAmount : "Enter your amount here",
            temporaryDate : "12345678910",
        })

        
    };

    handleChangeDesctiption (event) {
        this.setState({
          temporaryDescription: event.target.value
        });
    }
    handleChangeAmount (event) {
        this.setState({
          temporaryAmount: event.target.value
        });
    }

    componentDidMount(){
        this.mounted = true;
      
        axios.get("https://moj-api.herokuapp.com/debits")
            .then(response => {
                if(this.mounted) {
                var allAPIDebits = response.data.map(element => {
                    return (element.amount)
                });
                var sum= 0;
                for (var i = 0; i < allAPIDebits.length; i++) {
                    sum += allAPIDebits[i]
                };

                var allAddedDebits = this.state.addedData;   
        
                var sum1= 0;
                for (i = 0; i < allAddedDebits.length; i++) {
                    sum1 += parseFloat( allAddedDebits[i].amount)
                };
                sum = sum+sum1;
                var totalDebitArray = this.state.totalDebitArray;
                totalDebitArray[0] = sum;

                var result = response.data;
                this.setState({ 
                    kek: 1,
                    totalDebit: sum,
                    totalDebitArray: totalDebitArray,
                    fetchData: result,
                });
                console.log("fetch");
            }
            })
        .catch(err => console.log(err));
    };
      
    componentWillUnmount(){
        this.mounted = false;
    }

render() {
    
    var fetchDebit = this.state.fetchData.map((elem) => 
        <EveryDebit data={elem} key={elem.id}/>       
    );
    var addedDebit = this.state.addedData.map((elem) =>
        <EveryDebit data={elem} key={elem.id}/>
    );   
    return (
        <div>
          <h1>Debit</h1> 
          <div>Username: {this.props.userName}</div>
          <AccountBalance accountBalance={this.props.accountBalance} debit={this.state.totalDebitArray} credit={this.props.credit}/> <br/>
          <div>Enter your debit data here: </div>
          <input type='text' value = {this.state.temporaryDescription} onChange={this.handleChangeDesctiption}/>  <br/>
          <input type='text' value = {this.state.temporaryAmount} onChange={this.handleChangeAmount}/>  <br/>
          <button onClick={this.handleClick}>Add</button> <br/><br/>
          <div>Your debit data: </div><br/>
          
          <ul>{fetchDebit}</ul>
          <ul>{addedDebit}</ul>
          <Link to="/">Home</Link> 
        </div>
    );
  }
}

export default Debit;