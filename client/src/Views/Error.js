import React, { Component } from 'react';
import '../styles/Error.css';
import { Link } from 'react-router-dom';
import background from '../assets/P1020280.jpg';

 const Error = () => {
  
    return (
      <div className="error-wrapper" style={{ backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
          <h1>404 Error</h1>
          <p><Link to='/' className='homeBtn'><button>Let's start over!</button></Link></p>
        </div>
      </div>
    )
  
}

export default Error;
