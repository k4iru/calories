const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const app = express();
const client = redis.createClient();

// development defaults
const {
  PORT = 4000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'apple banna',
} = process.env;

// session settings
let sess = {
  store: new RedisStore({ client}),
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
  },
};

// set secure cookie for production
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(express.json());
app.use(session(sess));

app.listen(PORT, () =>
console.log(`http://localhost:${PORT}`)
);
