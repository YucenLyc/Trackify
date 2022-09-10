require('dotenv').config();
const { query } = require('express');
const express = require('express');
const app = express();
const querystring = require('query-string');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
  res.send('Hello It\'s Buzzie\'s World!');
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  //set a cookie: 
  res.cookie(stateKey, state);

  //these 2 scopes will allow access to the logged in account:
  const scope ='user-read-private user-read-email';

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code', 
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope
  })

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) =>
  res.send('callback')
)

const port = 9999;
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});