import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Home from './Views/Home';
import Results from './Views/Results';
// import ErrorDisplay from './Views/Error';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
      <App>
        <Switch>
            <Route exact path='/' component={Home}/>      
            <Route exact path='/results' component={Results}/>  
        </Switch>
      </App>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// <Route exact path='/error' component={ErrorDisplay}/>
          