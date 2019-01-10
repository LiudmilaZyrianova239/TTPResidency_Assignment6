// src/component/Credit.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import AccountBalance from './AccountBalance';
import './component.css';

class EveryCredit extends Component {
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



class Credit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCounter: this.props.addedCreditData.length,
            temporaryDescription : "Enter your description here",
            temporaryAmount : "Enter your amount here",
            temporaryDate : "12345678910",
            fetchData: [],
            addedData : this.props.addedCreditData,
            totalCreditArray : this.props.credit,
            totalCredit : this.props.credit[0],
            newCreditNumber: 0,
            newCredit: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeDesctiption = this.handleChangeDesctiption.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
    }


    handleClick() {
        var tempDate = new Date();
        var tdate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +'T'+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();             
        var newCreditElement =  {
            "id": this.state.idCounter,
            "description": this.state.temporaryDescription,
            "amount": this.state.temporaryAmount,
            "date": tdate,
        };

        var totalCredit = this.state.totalCredit;
        totalCredit = totalCredit + (parseFloat(newCreditElement.amount));
        var totalCreditArray = this.state.totalCreditArray;
        totalCreditArray[0] = totalCredit;

        var newAddedData = this.state.addedData;
        newAddedData.push(newCreditElement);
        
        var newID = this.state.idCounter + 1;  

        this.setState({
            totalCredit: totalCredit,
            totalCreditArray: totalCreditArray,
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
      
        axios.get("https://moj-api.herokuapp.com/credits")
            .then(response => {
                if(this.mounted) {
                var allAPICredit = response.data.map(element => {
                    return (element.amount)
                });
                var sum= 0;
                for (var i = 0; i < allAPICredit.length; i++) {
                    sum += allAPICredit[i]
                };

                var allAddedCredit = this.state.addedData;   
        
                var sum1= 0;
                for (i = 0; i < allAddedCredit.length; i++) {
                    sum1 += parseFloat( allAddedCredit[i].amount)
                };
                sum = sum+sum1;
                var totalCreditArray = this.state.totalCreditArray;
                totalCreditArray[0] = sum;

                var result = response.data;
                this.setState({ 
                    kek: 1,
                    totalCredit: sum,
                    totalCreditArray: totalCreditArray,
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
    
    var fetchCredit = this.state.fetchData.map((elem) => 
        <EveryCredit data={elem} key={elem.id}/>       
    );
    var addedCredit = this.state.addedData.map((elem) =>
        <EveryCredit data={elem} key={elem.id}/>
    );   
    return (
        <div>
            <h1 className= "App-header">Bank of React</h1>
            <h2 className= "Sub-header">Credit</h2> 
        <div className = "homePage">      
          <div className = "button"> 
                <Link className = "linkText" to="/">Home</Link> 
          </div> <br/>
          <div>Username: {this.props.userName}</div> <br/>
          <AccountBalance accountBalance={this.props.accountBalance} credit={this.state.totalCreditArray} debit={this.props.debit}/> <br/>
          <div className = "loginForm">
                <div>Enter credit data you want to add here: </div>
                <div >
                    <div>
                        <label  htmlFor="userName"></label>
                        <input type="text" classname="name" value = {this.state.temporaryDescription} onChange={this.handleChangeDesctiption} />
                    </div>
                    <div>
                        <label htmlFor="userName"></label>
                        <input type="text" classname="name" name="password" value = {this.state.temporaryAmount} onChange={this.handleChangeAmount}/>
                    </div>
                    <button className="submit" onClick={this.handleClick}>Add</button>
                </div>
        </div><br/> 
        <h3>Your credit data: </h3>          
          <ul className= "dataList">{fetchCredit}</ul>
          <ul className= "dataList">{addedCredit}</ul>
          </div> 
        </div>
    );
  }
}

export default Credit;