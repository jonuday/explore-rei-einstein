import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 const Error = () => {
  
    return (
      <div>
        <h1>404 Error</h1>
        <p>Please try again.</p>
        <p><Link to='/' className='homeBtn'><button>Let's start over!</button></Link></p>
      </div>
    )
  
}

export default Error;