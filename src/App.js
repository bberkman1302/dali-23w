import './App.css';
import { useState, useEffect } from 'react';
import Weather from './components/weather.js'
import Greeting from './components/greeting.js'
import Player from './components/player.js'
import Clock from './components/clock.js'
import SignIn from  './components/signin.js'

function App() {
  const [user, setUser] = useState(null);

  const handleSetUser = (username) => {
    setUser(username)
  }

  return (
    <div className="App"> 
      <div id = "topbar">
        <Weather></Weather>
        <Clock></Clock>
        <SignIn setUsername ={handleSetUser}></SignIn>
      </div>
      <div id = "wrapper">

        <div id = "content_wrap">
          {user ? (
            <Greeting name = {user}></Greeting>
          ) : (
            <Greeting name = {""}></Greeting>
          )}
          <Player></Player>
        </div>
      </div>

    </div>
  );
}

export default App;
