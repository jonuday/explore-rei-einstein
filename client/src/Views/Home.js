import React from 'react';
import '../styles/Home.css';
import background from '../assets/P1040594.jpg';

const Home = () => {
  
    return (
    <div className="home-wrapper" style={{ backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='explore-form'>
            <form method='POST' action='/api/ask_einstein'>
                <label>
                    <p>Tell us what you want to do in one sentence.</p>
                    <input id="sentence" type='text' placeholder='e.g. I want to help the world' name='sentence'/>
                </label>
                <label>
                    <p>Tell us where you are.</p>
                    <input id="location" type='text' placeholder='San Francisco, CA' name='location'/>
                </label>
                <div><button>Explore</button></div>
            </form>
        </div>
      </div>
    )
  
}

export default Home;