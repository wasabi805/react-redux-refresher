import React, { Component } from 'react';
import './assets/App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//  for Redux
import {Provider} from 'react-redux';
import store from './store';




import NavBar from './components/01-nav-bar';
import HeroBanner from './components/02-hero-banner';
import Landing from './components/03-landing'
import Login from './components/04-login';
import Register from './components/05-register';
import Home from './components/09-home';
import Footer from './components/10-footer'




class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
                <div className='main'>
                    <NavBar/>
                    <Route exact path="/"render={() => <Landing/>} />
                    <div className='comp-container'>
                        <Route exact path="/login" render={() => <Login/>} />
                        <Route exact path="/register" render={() => <Register/>} />
                        <Route exact path="/home" render={() => <Home/>} />
                    </div>
                    <Footer/>
                </div>
            </Router>
        </Provider>
    );
  }
}
export default App;
