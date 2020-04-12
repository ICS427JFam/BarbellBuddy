const mongoose = require('mongoose');
// this is our MongoDB database
const dbRoute =
  'mongodb+srv://BarbellBuddyDev:TeamGoguma@barbellbuddyserver-ytozr.azure.mongodb.net/BarbellBuddy?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


let db = mongoose.connection;

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
    console.log(await db.collection('Users')
      .findOne({ uid: result }));
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

(async () => {
  let users = await db.collection('Users').find({});

})();
