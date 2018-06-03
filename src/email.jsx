import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Navbar from './navBar.jsx';
import About from './aboutUs.jsx';
import { Button } from 'reactstrap';
import MediaQuery from 'react-responsive'




export default class Email extends Component{
  constructor(){
    super()
    this.runTest = this.runTest.bind(this);
    this.changeEmail = this.changeEmail.bind(this)
    this.changeMessage = this.changeMessage.bind(this);
    this.state = {emailAddress: "", message:""};


  }
  componentDidMount(){

    }

  changeEmail(e){
    this.setState({emailAddress: e.target.value})
  }
  changeMessage(e){
    this.setState({message: e.target.value})
  }
  runTest(){
  }

  render(){
    return(
      <div className = "App">
        <Navbar></Navbar>
        <MediaQuery query="(min-width: 1224px)">
          <div className = "emailForm">
          <form method="POST" action="https://formspree.io/countylinebeefarm@outlook.com">
          <input className = "email" name = "email" type = "email" placeholder = "Email Address" value = {this.state.emailAddress} onChange = {this.changeEmail}></input>
          <p><textarea name = 'message' className = "message" rows = "10" placeholder = "Message" value = {this.state.message} onChange = {this.changeMessage}></textarea></p>
          <input type="hidden" name="_subject" value="New Message From CountyLineBeeFarm.com" />
          <input type="hidden" name="_next" value={window.location.href} />
          <p><Button outline color="warning" size = "lg">Send Email</Button></p>
          </form>
        </div>
        <div className = 'contactInfo'>
          <h2>Have Questions or Comments?</h2>
          <p className = "emailP"><h4>You can reach us via email at</h4></p> <p><h4><b><font color = "yellow">CountyLineBeeFarm@Outlook.com</font></b></h4></p>
          <p><center><h5>-OR-</h5></center></p>
          <p><h4>Leave us your email and message using the form </h4></p><p><h4>and we'll get back to you as soon as possible.</h4></p>
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 1224px)">
        <div style = {{width: "95%", color: "white", marginLeft: "10px", marginRight: "10px"}}>
          <h4>Have Questions or Comments?</h4>
          <p className = "emailP"><h5>You can reach us via email at</h5></p> <p><h5><b><font color = "yellow">CountyLineBeeFarm@Outlook.com</font></b></h5></p>
          <p><center><h6>-OR-</h6></center></p>
          <p><h5>Leave us your email and message using the form below and we'll get back to you as soon as possible.</h5></p>
        </div>
        <div style = {{width: "95%", paddingBottom: "50px"}}>
          <form method="POST" action="https://formspree.io/countylinebeefarm@outlook.com">
          <input style = {{width: "85%", marginBottom: "10px"}}name = "email" type = "email" placeholder = "Email Address" value = {this.state.emailAddress} onChange = {this.changeEmail}></input>
          <p><textarea style = {{width: "85%"}} name = 'message'  rows = "4" placeholder = "Message" value = {this.state.message} onChange = {this.changeMessage}></textarea></p>
          <input style = {{width: "85%"}} type="hidden" name="_subject" value="New Message From CountyLineBeeFarm.com" />
          <input style = {{width: "85%"}} type="hidden" name="_next" value={window.location.href} />
          <p><Button outline color="warning" size = "lg">Send Email</Button></p>
          </form>
        </div>
      </MediaQuery>
    </div>
    )
  }
}
