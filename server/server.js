const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./user');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://BarbellBuddyDev:TeamGoguma@barbellbuddyserver-ytozr.azure.mongodb.net/BarbellBuddy?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true  });

let db = mongoose.connection;

let users = mongoose.connection.collection('Users');

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send("Barbell Buddy Express Server");
  console.log('hello');
});

app.post('/addUser', (req, res) => {
  const newUser = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  }
  const a = new User();
  db.collection('Users').insertOne(newUser);
  console.log('Inserted new user.');
});

app.get('/userList', async (req, res) => {
  res.send(await users.find({}).toArray());
});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
