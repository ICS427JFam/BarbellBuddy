const mongoose = require('mongoose');
const express = require('express');
const  cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

 const API_PORT = 3001;
const app = express();
app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
// app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));
// app.use(passport.initialize());
// app.use(passport.session());

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://Gian:A1B2C3D4F6@barbellbuddyserver-ytozr.azure.mongodb.net/test';

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.set('debug', true);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

require('./models/User');
require('./models/WeightInventory');
require('./config/passport');

app.use(require('./routes'));

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({'errors': {
      message: err.message,
      error: err
    }});
});
