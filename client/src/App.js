import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';
import { Login, Profile } from './pages';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`;

function ScrollToTop() {
  const { pathName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile(accessToken);
      setProfile(data);
    }
    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <GlobalStyle/>
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <Router>
            <ScrollToTop />
            <Switch>
              <Route path="/top-artists">
                <h2>Top Artists</h2>
              </Route>
              <Route path="/top-tracks">
                <h2>Top Tracks</h2>
              </Route>
              <Route path="/playlists/:id">
                <h2>Playlist</h2>
              </Route>
              <Route path="/playlists">
                <h2>Playlists</h2>
              </Route>
              <Route path="/">
                <button onClick={logout}>Log Out</button>
                {profile && < Profile />}
                {/* {profile && (
                  <div>
                    <h1>{profile.display_name}</h1>
                    <p>{profile.followers.total} Follwer(s)</p>
                    {profile.images.length && profile.images[0].url && (
                      <img src={profile.images[0].url} alt="Avatar" />
                    )}
                  </div>
                )} */}
              </Route>
            </Switch>
          </Router>
        )}
      </header>
    </div >
  );
}

export default App;
