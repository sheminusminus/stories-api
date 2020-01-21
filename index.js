require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3005;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getToken = (userId, userName) => {
  const key = process.env.CK_SECRET_KEY;
  const envId = process.env.CK_ENV_ID;
  return jwt.sign({
    iat: Math.floor(Date.now() / 1000),
    iss: envId,
    user: {
      id: userId,
      name: userName,
    },
    auth: {
      collaboration: {
        '*': {
          role: 'writer',
        },
      },
    },
  }, key, { algorithm: 'HS256' });
};

app.post('/api/ck-token', (req, res) => {
  const { userId, userName } = req.body;
  const token = getToken(userId, userName);
  res.set('Content-Type', 'application/json');
  res.send(token);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
