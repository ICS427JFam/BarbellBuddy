const mongoose = require('mongoose');

const WeightInventorySchema = new mongoose.Schema({
  userID: mongoose.ObjectId,
  unit: String,
  barType: String,
  kgInventory: Object,
  lbInventory: Object,
});

mongoose.model('WeightInventory', WeightInventorySchema);
