const mongoose = require('mongoose');

const WeightInventorySchema = new mongoose.Schema({
  userID: String,
  unit: String,
  barType: String,
  kgInventory: Object,
  lbInventory: Object,
}, { collection: 'weightinventories' });

WeightInventorySchema.methods.toAuthJSON = function () {
  return {
    userID: this.userID,
    unit: this.unit,
    barType: this.barType,
    kgInventory: this.kgInventory,
    lbInventory: this.lbInventory,
  }
};

mongoose.model('WeightInventory', WeightInventorySchema);
