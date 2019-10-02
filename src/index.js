import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import About from './aboutUs.jsx';
import Email from './email.jsx';
import CCD from './ccd.jsx';
import NotFound from './notFound.jsx';
import Submitted from './submitted.jsx';
import BuyHoney from './buyHoney.jsx';
import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment-timezone';
import navBar from './navBar.jsx'

//setup the firebase database
firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
})

const currentStock = {
  fall:{
    ball: true,
    muth: true,
    squeeze: true
  },
  spring:{
    ball: true,
    muth: true,
    squeeze: true
  },
  clover:{
    ball: true,
    muth: true,
    squeeze: true
  }
}




// const About = () => <div><Navbar /><h1>About Us</h1></div>
// const BuyHoney = () => <div style = {{ backgroundColor: "black", color: "white", width: "100%", height: "100%", position: "fixed"}}><Navbar /><h1>Coming Soon!</h1></div>
const Contact = () => <div><Email /></div>

export default class Routing extends Component {
  constructor(){
    super();
    this.state = {honeyStock: currentStock, marketList:[]}
    this.ref = firebase.database().ref();
    moment.tz.setDefault('America/New_York');
  }
  componentDidMount(){
    //fetch the calendar data for the markets
    let eventArray = [];
    fetch('https://www.googleapis.com/calendar/v3/calendars/ofkq1b5ka5op4veofadtjil1pg@group.calendar.google.com/events?key=AIzaSyA1WPUNBTGcbNwa14ssqUzm9dU1HIFpqLE')
    .then(response=> response.json())
    .then(data=>data.items.forEach(event=>{
      //check if the event dates has property date or datetime
      //(depends on whether all day event or specific time)
      let dateProp = event.end.hasOwnProperty('dateTime') ? 'dateTime' : 'date'
      let eventDate = moment(event.end[dateProp]);
      let todaysDate = moment();
      //if the event date has not passed, add it to the array
      if(eventDate > todaysDate){
        eventArray.push({
          date: moment(event.start[dateProp]),
          name: event.summary
        })
      }
    })).then(this.setState({marketList: eventArray}))
    //load in all the honey in stock values
    let newStock = {...currentStock};
    this.ref.once('value').then((snapshot) =>{
      newStock.fall.ball = snapshot.child('fall/ball').val();
      newStock.fall.muth = snapshot.child('fall/muth').val();
      newStock.fall.squeeze = snapshot.child('fall/squeeze').val();
      newStock.spring.ball = snapshot.child('spring/ball').val();
      newStock.spring.muth = snapshot.child('spring/muth').val();
      newStock.spring.squeeze = snapshot.child('spring/squeeze').val();
      newStock.clover.ball = snapshot.child('clover/ball').val();
      newStock.clover.muth = snapshot.child('clover/muth').val();
      newStock.clover.squeeze = snapshot.child('clover/squeeze').val();
    }).then(()=>{
      this.setState({honeyStock: newStock})
    })
  }
  render(){
    const {honeyStock, marketList} = this.state;
    return(
      <Router>
        <div>
          <Route path = '/' component = {navBar} />
          <Switch>
            <Route exact path = "/" component = {App}/>
            <Route path = "/about" component = {About} />
            <Route path = "/help-the-bees" component = {CCD} />
            <Route path = "/buy-honey"
              render = {(props)=><BuyHoney {...props}
                honeyStock = {honeyStock}
                marketList = {marketList}
              />}
            />
            <Route path = "/contact" component = {Contact} />
            <Route path = '/submitted' component = {Submitted} />
            <Route component = {NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Routing />, document.getElementById('root'));
registerServiceWorker();
