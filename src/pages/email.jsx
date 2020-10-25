import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/email.css'
import { Button } from 'reactstrap';
import {useMediaQuery} from 'react-responsive'

const Email = () =>{
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [email, changeEmail] =  useState('');
  const [message, changeMessage] = useState('');
  return !isTabletOrMobile ? (
    <div id = 'emailPage' className = 'page'>
      <div className = "emailForm">
        <form method="POST" action="https://formspree.io/info@countylinebeefarm.com">
          <input className = "email" name = "email" type = "email" placeholder = "Email Address" value = {email} onChange = {(e)=>changeEmail(e.target.value)}></input>
          <textarea name = 'message' className = "message" rows = "10" placeholder = "Message" value = {message} onChange = {(e)=>changeMessage(e.target.value)}></textarea>
          <input type="hidden" name="_subject" value="New Message From CountyLineBeeFarm.com" />
          <input type="hidden" name="_next" value = '/submitted' />
          <Button>Send Email</Button>
        </form>
      </div>
      <div className = 'contactInfo'>
        <h2>Have Questions or Comments?</h2>
        <h4><p className = "emailP">You can reach us via email at</p><p><b><font color = "#cfb53b">info@CountyLineBeeFarm.com</font></b></p></h4>
        <h5><center>-OR-</center></h5>
        <h4>Leave us your email and message using the form and we'll get back to you as soon as possible.</h4>
      </div>
    </div>
  ) : (
    <div>
      <div className = 'mobileContactInfo'>
        <h4>Have Questions or Comments?</h4>
        <div className = 'emailP'>
          <h5>You can reach us via email at:</h5>
        </div>
        <div className = 'emailAddress'>
          <h5>info@CountyLineBeeFarm.com</h5>
        </div>
        <h6>-OR-</h6>
        <h5><p>Leave us your email and message using the form below and we'll get back to you as soon as possible.</p></h5>
      </div>
      <div className = 'mobileEmailForm'>
        <form method="POST" action="https://formspree.io/info@countylinebeefarm.com">
        <input className = 'mobileEmailAddress' name = "email" type = "email"
          placeholder = "Email Address" value = {email}
          onChange = {(e)=>changeEmail(e.target.value)} />
        <textarea className = 'mobileMessage' name = 'message'  rows = "4"
          placeholder = "Message" value = {message}
          onChange = {(e)=>changeMessage(e.target.value)}/>
        <input className = 'mobileMessage' type="hidden" name="_subject"
          value="New Message From CountyLineBeeFarm.com" />
        <input className = 'mobileMessage' type="hidden" name="_next"
          value= '/submitted' />
        <Button>Send Email</Button>
        </form>
      </div>
    </div>
  )
}
export default Email;


// export default class Email extends Component{
//   constructor(){
//     super()
//     this.state = {emailAddress: "", message:""};
//
//
//   }
//
//   changeEmail = e =>{
//     this.setState({emailAddress: e.target.value})
//   }
//   changeMessage = e =>{
//     this.setState({message: e.target.value})
//   }
//   render(){
//     return(
//       <div id = 'email'>
//         <MediaQuery minWidth = {1224}>
//           <div className = "emailForm">
//           <form method="POST" action="https://formspree.io/info@countylinebeefarm.com">
//           <input className = "email" name = "email" type = "email" placeholder = "Email Address" value = {this.state.emailAddress} onChange = {this.changeEmail}></input>
//           <p><textarea name = 'message' className = "message" rows = "10" placeholder = "Message" value = {this.state.message} onChange = {this.changeMessage}></textarea></p>
//           <input type="hidden" name="_subject" value="New Message From CountyLineBeeFarm.com" />
//           <input type="hidden" name="_next" value = '/submitted' />
//           <p className = 'formButton'><Button outline color="warning" size = "lg">Send Email</Button></p>
//           </form>
//         </div>
//         <div className = 'contactInfo'>
//           <h2>Have Questions or Comments?</h2>
//           <h4><p className = "emailP">You can reach us via email at</p><p><b><font color = "#cfb53b">info@CountyLineBeeFarm.com</font></b></p></h4>
//           <h5><center><p>-OR-</p></center></h5>
//           <h4><p>Leave us your email and message using the form </p><p>and we'll get back to you as soon as possible.</p></h4>
//         </div>
//       </MediaQuery>
//       <MediaQuery maxWidth = {1224}>
//         <div style = {{width: "85%", color: "white", margin: 'auto', paddingTop: '20px'}}>
//           <h4>Have Questions or Comments?</h4>
//           <h5><p className = "emailP">You can reach us via email at</p> <p><b><font color = "#cfb53b">info@CountyLineBeeFarm.com</font></b></p></h5>
//           <h6><center><p>-OR-</p></center></h6>
//           <h5><p>Leave us your email and message using the form below and we'll get back to you as soon as possible.</p></h5>
//         </div>
//         <div style = {{width: "95%", paddingBottom: "50px", margin: 'auto'}}>
//           <form method="POST" action="https://formspree.io/info@countylinebeefarm.com">
//           <input style = {{width: "85%", marginBottom: "10px"}}name = "email" type = "email" placeholder = "Email Address" value = {this.state.emailAddress} onChange = {this.changeEmail}></input>
//           <p><textarea style = {{width: "85%"}} name = 'message'  rows = "4" placeholder = "Message" value = {this.state.message} onChange = {this.changeMessage}></textarea></p>
//           <input style = {{width: "85%"}} type="hidden" name="_subject" value="New Message From CountyLineBeeFarm.com" />
//           <input style = {{width: "85%"}} type="hidden" name="_next" value= '/submitted' />
//           <p className = 'formButton'><Button outline color="warning" size = "lg">Send Email</Button></p>
//           </form>
//         </div>
//       </MediaQuery>
//     </div>
//     )
//   }
// }
