const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.get('/ck-token', (req, res) => {

});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
