import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navBar.jsx';
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
          <form method="POST" action="https://formspree.io/info@countylinebeefarm.com">
          <input className = "email" name = "email" type = "email" placeholder = "Email Address" value = {this.state.emailAddress} onChange = {this.changeEmail}></input>
          <p><textarea name = 'message' className = "message" rows = "10" placeholder = "Message" value = {this.state.message} onChange = {this.changeMessage}></textarea></p>
          <input type="hidden" name="_subject" value="New Message From CountyLineBeeFarm.com" />
          <input type="hidden" name="_next" value = '/submitted' />
          <p><Button outline color="warning" size = "lg">Send Email</Button></p>
          </form>
        </div>
        <div className = 'contactInfo'>
          <h2>Have Questions or Comments?</h2>
          <h4><p className = "emailP">You can reach us via email at</p><p><b><font color = "yellow">info@CountyLineBeeFarm.com</font></b></p></h4>
          <h5><center><p>-OR-</p></center></h5>
          <h4><p>Leave us your email and message using the form </p><p>and we'll get back to you as soon as possible.</p></h4>
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 1224px)">
        <div style = {{width: "85%", color: "white", margin: 'auto'}}>
          <h4>Have Questions or Comments?</h4>
          <h5><p className = "emailP">You can reach us via email at</p> <p><b><font color = "yellow">CountyLineBeeFarm@Outlook.com</font></b></p></h5>
          <h6><center><p>-OR-</p></center></h6>
          <h5><p>Leave us your email and message using the form below and we'll get back to you as soon as possible.</p></h5>
        </div>
        <div style = {{width: "95%", paddingBottom: "50px", margin: 'auto'}}>
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
