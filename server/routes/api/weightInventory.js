const router = require('express').Router();
const mongoose = require('mongoose');
const WeightInventory = mongoose.model('WeightInventory');
const auth = require('../auth');
const User = mongoose.model('User');

router.param('username', function (req, res, next, query) {
  WeightInventory.find({ userID: query }).then(function (weightInventory) {
    if (!weightInventory) {
      return res.sendStatus(401);
    }
    req.weightInventory = weightInventory;
    next()
  })
});

router.get('/:username', auth.required, function (req, res, next) {
  // req.body.weightInventory.userID
  WeightInventory.find({ userID: req.params.username }).then(function (weightInventory) {
    return res.json({ weightInventory: weightInventory[0].toAuthJSON() });
  }).catch(next);
});

router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401);
    }

    const weightInventory = new WeightInventory(req.body.weightInventory);
    weightInventory.userID = user.username;

    return weightInventory.save().then(function () {
      return res.json({ weightInventory: weightInventory.toAuthJSON() });
    })
  }).catch(next);
});

router.put('/:username', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401);
    }

    WeightInventory.find({ userID: user.username }, function (err, inventory) {
      if (err) {
        next(err);
      }
      const weightInventory = inventory[0];

      if (typeof req.body.weightInventory.unit !== 'undefined') {
        weightInventory.unit = req.body.weightInventory.unit;
      }
      if (typeof req.body.weightInventory.barType !== 'undefined') {
        weightInventory.barType = req.body.weightInventory.barType;
      }
      if (typeof req.body.weightInventory.kgInventory !== 'undefined') {
        weightInventory.kgInventory = req.body.weightInventory.kgInventory;
      }
      if (typeof req.body.weightInventory.lbInventory !== 'undefined') {
        weightInventory.lbInventory = req.body.weightInventory.lbInventory;
      }

      weightInventory.save().then(function (weightInventory) {
        return res.json({ weightInventory: weightInventory.toAuthJSON() })
      }).catch(next);
    });
  }).catch(next);
});

module.exports = router;
