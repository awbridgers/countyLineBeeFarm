import React, {Component, useEffect} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './pages/App.css'
import 'firebase/database';
import moment from 'moment-timezone';
import firebase from 'firebase/app';
import {HashRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store.js';
import App from './pages/App.js';
import About from './pages/aboutUs.jsx';
import Email from './pages/email.jsx';
import CCD from './pages/ccd.jsx';
import NotFound from './pages/notFound.jsx';
import Submitted from './pages/submitted.jsx';
import BuyHoney from './pages/buyHoney.jsx';
import NavBar from './components/navBar.jsx'


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


//setup the firebase database
firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
})


export default class Routing extends Component {
  constructor(){
    super();
    this.state = {honeyStock:{muth: false, hex: false, squeeze: false}, marketList:[]}
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
    let newStock;
    this.ref.once('value').then((snapshot) =>{
      newStock = snapshot.child('honeyStock').val()
    }).then(()=>{
      this.setState({honeyStock: newStock})
    })
  }
  render(){
    const {honeyStock, marketList} = this.state;
    return(
      <div className = 'App'>
        <Router>
          <ScrollToTop />
          <div>
            <Route path = '/'>
              <NavBar />
            </Route>
              <Switch>
                <Route exact path = "/">
                  <App />
                </Route>
                <Route path = "/about">
                  <About />
                </Route>
                <Route path = "/help-the-bees">
                  <CCD />
                </Route>
                <Route path = "/buy-honey">
                  <BuyHoney
                    honeyStock = {honeyStock}
                    marketList = {marketList}
                    />
                </Route>
                <Route path = "/contact">
                  <Email />
                </Route>
                <Route path = '/submitted'>
                  <Submitted />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store = {store}>
    <Routing />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
