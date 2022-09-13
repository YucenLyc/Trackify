import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const querystring = window.location.search;
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="http://localhost:9999/login">
          Log in to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
