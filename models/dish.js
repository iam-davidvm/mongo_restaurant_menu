const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
    enum: ['voorgerecht', 'hoofdgerecht', 'dessert'],
  },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
