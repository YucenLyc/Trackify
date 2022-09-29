import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';
import { Login, Profile } from './pages';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
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
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
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
                <Profile />
              </Route>
            </Switch>
          </Router>
          </>
        )}
      </header>
    </div >
  );
}

export default App;
