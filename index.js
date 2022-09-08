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

app.get('/login', (req, res) => {
  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code', 
    redirect_uri: REDIRECT_URI,
  })


  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

const port = 9999;
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});