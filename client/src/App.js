import { useState, useEffect } from 'react';
import { accessToken, logout } from './spotify';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          < a className="App-link" href="http://localhost:9999/login">
            Log in to Spotify
          </a>
        ) : (
          <>
          <h1>Logged In!</h1>
          <button onClick={logout}>Log Out</button>
          </>
        )}
      </header>
    </div >
  );
}

export default App;
