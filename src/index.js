import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './navBar.jsx';
import About from './aboutUs.jsx';
import Email from './email.jsx';
import CCD from './ccd.jsx';
import NotFound from './notFound.jsx';
import Submitted from './submitted.jsx';
import BuyHoney from './buyHoney.jsx';
import firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
})


// const About = () => <div><Navbar /><h1>About Us</h1></div>
// const BuyHoney = () => <div style = {{ backgroundColor: "black", color: "white", width: "100%", height: "100%", position: "fixed"}}><Navbar /><h1>Coming Soon!</h1></div>
const Contact = () => <div><Email /></div>



const Routing = () =>{
  return(
    <Router>
      <Switch>
        <Route exact path = "/" component = {App} />
        <Route path = "/about" component = {About} />
        <Route path = "/help-the-bees" component = {CCD} />
        <Route path = "/buy-honey" component = {BuyHoney} />
        <Route path = "/contact" component = {Contact} />
        <Route path = '/submitted' component = {Submitted} />
        <Route component = {NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Routing />, document.getElementById('root'));
registerServiceWorker();
