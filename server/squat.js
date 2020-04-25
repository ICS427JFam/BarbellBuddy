// backend/data.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bench collection data structure
const SquatSchema = new Schema(
  {
    uid: String,
    unit: String,
    barType: String,
    kgInventory: {
      '25kg': Number,
      '20kg': Number,
      '15kg': Number,
      '10kg': Number,
      '5kg': Number,
      '2_1/2kg': Number,
      '2kg': Number,
      '1_1/2kg': Number,
      '1kg': Number,
      '1/2kg': Number,
    },
    lbInventory: {
      '45lb': Number,
      '35lb': Number,
      '25lb': Number,
      '10lb': Number,
      '5lb': Number,
      '2_1/2lb': Number,
    },
  },
);
module.exports = mongoose.model('Squat', SquatSchema);
