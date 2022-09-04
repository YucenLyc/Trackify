const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello It\'s Buzzie\'s World!');
});

const port = 9999;
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});