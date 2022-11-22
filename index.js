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

app.get('/dish/add', (req, res) => {
  const type = req.query.type;
  res.render('new.ejs', { type });
});

app.post('/dish/new', async (req, res) => {
  const { course, name, ingredients, price } = req.body;
  const lowerIngredients = ingredients.map((ingredient) => {
    return ingredient.toLowerCase();
  });
  const newDish = new Dish({
    course,
    name,
    ingredients: lowerIngredients,
    price,
  });
  await newDish.save();
  res.redirect('/menu');
});

app.get('/dish/edit/:id', async (req, res) => {
  const { id } = req.params;

  const dish = await Dish.findById(id);
  res.render('edit', { dish });
});

app.patch('/dish/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { course, name, ingredients, price } = req.body;
  const lowerIngredients = ingredients.map((ingredient) => {
    return ingredient.toLowerCase();
  });
  const dish = await Dish.findByIdAndUpdate(
    id,
    { course, name, ingredients: lowerIngredients, price },
    {
      runValidators: true,
    }
  );
  res.redirect('/menu');
});

app.delete('/dish/:id', async (req, res) => {
  const { id } = req.params;
  await Dish.findByIdAndDelete(id);
  res.redirect('/menu');
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(3000, () => {
  console.log('Listening to 3000');
});
