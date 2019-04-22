import React from 'react';
import '../styles/Home.css';
import background from '../assets/P1040594.jpg';
import TextLoop from "react-text-loop";

const Home = () => {
  
    return (
    <div className="home-wrapper" style={{ backgroundImage: 'url(' + background + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>        

        <div className='explore-form'>
            <p className="examples"><TextLoop interval={3500} delay={1000} children={["I want to help the world.", "I want to take my kids cycling.","How do I climb mountains.","I need to get back in shape.", "How do I survive in the wilderness?"]} /></p>

            <form method='POST' action='/api/ask_einstein'>
                <label>
                    <p>Tell us what you want to do in one sentence... </p>                    
                    <input id="sentence" type='text' placeholder="I want..." name='sentence'/>
                </label>
                <p></p>
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