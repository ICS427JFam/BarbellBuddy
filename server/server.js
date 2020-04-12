const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./user');
const Bench = require('./bench');
const Squat = require('./squat');
const Deadlift = require('./deadlift');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://BarbellBuddyDev:TeamGoguma@barbellbuddyserver-ytozr.azure.mongodb.net/BarbellBuddy?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


let db = mongoose.connection;

let users = mongoose.connection.collection('Users');
let bench = mongoose.connection.collection('Benches');
let squat = mongoose.connection.collection('Squats');
let deadlift = mongoose.connection.collection('Deadlifts');

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Barbell Buddy Express Server');
});

// Instantiate a new User and their lifts
app.post('/addUser', async (req, res) => {
  userID = await makeID();
  const newUser = new User({
    uid: userID,
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });
  const newBench = new Bench({
    uid: userID,
    unit: '0',
    barType: 'none',
    kgInventory: {
      '25kg': 0,
      '20kg': 0,
      '15kg': 0,
      '10kg': 0,
      '5kg': 0,
      '2_1/2kg': 0,
      '2kg': 0,
      '1_1/2kg': 0,
      '1kg': 0,
      '1/2kg': 0,
    },
    lbInventory: {
      '45lb': 0,
      '35lb': 0,
      '25lb': 0,
      '10lb': 0,
      '5lb': 0,
      '2_1/2lb': 0,
    },
  });
  const newSquat = new Squat({
    uid: userID,
    unit: 0,
    barType: 'none',
    kgInventory: {
      '25kg': 0,
      '20kg': 0,
      '15kg': 0,
      '10kg': 0,
      '5kg': 0,
      '2_1/2kg': 0,
      '2kg': 0,
      '1_1/2kg': 0,
      '1kg': 0,
      '1/2kg': 0,
    },
    lbInventory: {
      '45lb': 0,
      '35lb': 0,
      '25lb': 0,
      '10lb': 0,
      '5lb': 0,
      '2_1/2lb': 0,
    },
  });
  const newDeadlift = new Deadlift({
    uid: userID,
    unit: 0,
    barType: 'none',
    kgInventory: {
      '25kg': 0,
      '20kg': 0,
      '15kg': 0,
      '10kg': 0,
      '5kg': 0,
      '2_1/2kg': 0,
      '2kg': 0,
      '1_1/2kg': 0,
      '1kg': 0,
      '1/2kg': 0,
    },
    lbInventory: {
      '45lb': 0,
      '35lb': 0,
      '25lb': 0,
      '10lb': 0,
      '5lb': 0,
      '2_1/2lb': 0,
    },
  });

  db.collection('Benches')
    .insertOne(newBench);
  db.collection('Squats')
    .insertOne(newSquat);
  db.collection('Deadlifts')
    .insertOne(newDeadlift);
  db.collection('Users')
    .insertOne(newUser);
  console.log('Inserted new user and instantiated lifts.');
});

// Get user list
app.get('/userList', async (req, res) => {
  res.send(await users.find({})
    .toArray());
});

// Get bench list
app.get('/benchList', async (req, res) => {
  res.send(await bench.find({})
    .toArray());
});

// Get squat list
app.get('/squatList', async (req, res) => {
  res.send(await squat.find({})
    .toArray());
});

// Get deadlift list
app.get('/deadliftList', async (req, res) => {
  res.send(await deadlift.find({})
    .toArray());
});

// Update user
app.put('/updateUser', (req, res) => {
  db.collection('Users')
    .findOneAndUpdate({ uid: req.body.uid }, {
      $set: {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        password: req.body.password,
      },
    });
  console.log('Updated user info');
});

// Update Bench
app.put('/updateBench', (req, res) => {
  db.collection('Benches')
    .findOneAndUpdate({ uid: req.body.uid }, {
      $set: {
        unit: req.body.unit,
        barType: req.body.barType,
        kgInventory: req.body.kgInventory,
        lbInventory: req.body.lbInventory,
      },
    });
});

// Update squat
app.put('/updateSquat', (req, res) => {
  db.collection('Squats')
    .findOneAndUpdate({ uid: req.body.uid }, {
      $set: {
        unit: req.body.unit,
        barType: req.body.barType,
        kgInventory: req.body.kgInventory,
        lbInventory: req.body.lbInventory,
      },
    });
});

// Update deadlift
app.put('/updateDeadlift', (req, res) => {
  db.collection('Deadlifts')
    .findOneAndUpdate({ uid: req.body.uid }, {
      $set: {
        unit: req.body.unit,
        barType: req.body.barType,
        kgInventory: req.body.kgInventory,
        lbInventory: req.body.lbInventory,
      },
    });
});

// Delete user and lifts
app.put('/deleteUser', (req, res) => {
  let userID = req.body.uid;
  db.collection('Users')
    .findOneAndDelete({ uid: userID })
    .then(()=>{
      db.collection('Benches')
        .findOneAndDelete({ uid: userID });
      db.collection('Squats')
        .findOneAndDelete({ uid: userID });
      db.collection('Deadlifts')
        .findOneAndDelete({ uid: userID });
    })
    .catch((err)=> console.log(err.message));
  console.log(`deleted ${userID}`);
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////// Server Helper Functions //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

async function makeID() {
  let exist = true;
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  // create a uid
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength));
  }
// Loop to check if uid already exists
  while (exist) {
    // If uid exists, create a new uid
    if (await db.collection('Users')
      .findOne({ uid: result }) != null) {
      for (var i = 0; i < 8; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength));
      }
    } else {
      // else exit loop
      exist = false;
    }
  }
  return result;
}
