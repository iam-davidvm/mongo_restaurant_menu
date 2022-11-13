const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const Dish = require('./models/dish');

mongoose
  .connect('mongodb://localhost:27017/restaurantApp')
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('Oops, something went wrong');
    console.log(err);
  });

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/menu', async (req, res) => {
  const dishes = await Dish.find({});
  res.render('menu', { dishes });
});

app.listen(3000, () => {
  console.log('Listening to 3000');
});
