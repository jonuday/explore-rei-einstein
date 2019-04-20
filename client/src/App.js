import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/rei-co-op-logo-black.svg';
import './styles/App.css';

const App = ({ children }) => (
  <div className="App">
    <header className='header'>
        <img src={logo} alt="REI Co-Op Logo" className="App-logo"/>
        <h1>Expanding Exploration</h1>
    </header>
    <main>
      {children}
    </main>
  </div>
);

export default App;