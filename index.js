require('dotenv').config();
const { query } = require('express');
const express = require('express');
const app = express();
const querystring = require('query-string');
const axios = require('axios');

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

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    //config object 
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
  .then(response => {
    if (response.status === 200){
      res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`); //formating the return JSON
    } else {
      return res.send(response);
    }
  })
  .catch(error => {
    res.send(error);
  })
})

const port = 9999;
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});