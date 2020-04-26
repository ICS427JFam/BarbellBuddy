const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const WeightInventory = mongoose.model('WeightInventory');
const auth = require('../auth');

/**
 * Sends a request to login a user
 */
router.post('/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

/**
 * Sends a request to register a user
 */
router.post('/register', function (req, res, next) {
  const user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  const newUser = user.save().then(function () {
    const defaultWeightInventory = {
        userID: user.username,
        unit: "kilograms",
        barType: "men",
        kgInventory: {
          "25": 2,
          "20": 2,
          "15": 2,
          "10": 2,
          "5": 2,
          "2_5": 2,
          "2": 2,
          "1_5": 2,
          "1": 2,
          "0_5": 2
        },
        lbInventory: {
          "45": 6,
          "35": 2,
          "25": 2,
          "10": 2,
          "5": 2,
          "2_5": 2
        }
    };
    const weightInventory = new WeightInventory(defaultWeightInventory);
    const jsonReturn = {};
    jsonReturn.user = user.toAuthJSON();
    weightInventory.save().then(function () {
      jsonReturn.weightInventory = weightInventory.toAuthJSON();
    });
    return res.json(jsonReturn);
  }).catch(next);
});

// router.get('/allUsers', function (req, res, next) {
//   User.find({}).then(function (results) {
//     return res.json({
//       users: results.map(function (user) {
//         return user.toAuthJSON();
//       })
//     })
//   }).catch(next);
// });
//
// router.get('/loggedIn', function (req, res) {
//   if (req.user) {
//     return res.json({ authenthicated: true });
//   } else {
//     res.json({ authenthicated: false });
//   }
// });
//
// /**
//  * Return the logged in user's info
//  */
// router.get('/', auth.required, function (req, res, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) {
//       return res.sendStatus(401);
//     }
//
//     return res.json({ user: user.toAuthJSON() });
//   }).catch(next);
// });
//
// /**
//  * Sends a request to update a user's info
//  */
// router.put('/', auth.required, function (req, res, next) {
//   User.findById(req.payload.id).then(function (user) {
//     if (!user) {
//       return res.sendStatus(401);
//     }
//
//     // only update fields that were actually passed...
//     if (typeof req.body.user.username !== 'undefined') {
//       user.username = req.body.user.username;
//     }
//     if (typeof req.body.user.email !== 'undefined') {
//       user.email = req.body.user.email;
//     }
//     if (typeof req.body.user.password !== 'undefined') {
//       user.setPassword(req.body.user.password);
//     }
//
//     return user.save().then(function () {
//       return res.json({ user: user.toAuthJSON() });
//     });
//   }).catch(next);
// });

module.exports = router;
