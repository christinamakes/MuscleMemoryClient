import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, browserRouter, BrowserRouter } from 'react-router-dom'
import NavBar from './components/navBar';
import HomepageNavBar from './components/homepageNavBar'
import dashboard from './components/dashboard';
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path='/' component={HomepageNavBar} />
        <Route exact path='/dashboard' component={NavBar} />
        <Route exact path='/register' component={NavBar} />
        <Route exact path='/login' component={NavBar} />
        <Route exact path='/exercises' component={NavBar} />
        <Route exact path='/workouts' component={NavBar} />
        <App />
      </div>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root'));
// registerServiceWorker();
