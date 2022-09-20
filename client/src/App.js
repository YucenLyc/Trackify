import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile(accessToken);
        setProfile(data);
      } catch(event) {
        console.error(event);
      }
    }
    fetchData();
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
