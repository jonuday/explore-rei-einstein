import React from 'react';

const Home = () => {
  
    return (
      <div className='explore-form'>
        <form method='POST' action='/ask_einstein'>
            <label>
                <p>Tell us what you want to do in one sentence.</p>
                <input id ="sentence" type='text' placeholder='I want to help the world' name='sentence'/>
            </label>
            <label>
                <p>Tell us where you are.</p>
                <input id="location" type='text' placeholder='City, State' name='location'/>
            </label>
            <p><button>Explore</button></p>
        </form>
      </div>
    )
  
}

export default Home;