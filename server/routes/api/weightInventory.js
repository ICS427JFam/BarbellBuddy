const router = require('express').Router();
const mongoose = require('mongoose');
const WeightInventory = mongoose.model('WeightInventory');

router.get('/', (req, res) => {
  res.send('test');
});
module.exports = router;
