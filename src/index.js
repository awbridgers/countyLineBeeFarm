import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Navbar from './navBar.jsx'
import About from './aboutUs.jsx'
import Email from './email.jsx'



// const About = () => <div><Navbar /><h1>About Us</h1></div>
const BuyHoney = () => <div style = {{ backgroundColor: "black", color: "white", width: "100%", height: "100%", position: "fixed"}}><Navbar /><h1>Coming Soon!</h1></div>
const Contact = () => <div><Email /></div>

const Routing = () =>{
  return(
    <Router>
      <div>
        <Route exact path = "/" component = {App} />
        <Route path = "/about" component = {About} />
        <Route path = "/buy-honey" component = {BuyHoney} />
        <Route path = "/contact" component = {Contact} />
      </div>
    </Router>
  )
}

ReactDOM.render(<Routing />, document.getElementById('root'));
registerServiceWorker();
