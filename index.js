const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// error handling
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

const { dishSchema } = require('./schemas');

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

const validateDish = (req, res, next) => {
  const { error } = dishSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get(
  '/menu',
  catchAsync(async (req, res) => {
    const dishes = await Dish.find({});
    res.render('menu', { dishes });
  })
);

app.get('/dish/add', (req, res) => {
  const type = req.query.type;
  res.render('new.ejs', { type });
});

app.post(
  '/dish/new',
  validateDish,
  catchAsync(async (req, res) => {
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
  })
);

app.get(
  '/dish/edit/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const dish = await Dish.findById(id);
    res.render('edit', { dish });
  })
);

app.patch(
  '/dish/edit/:id',
  validateDish,
  catchAsync(async (req, res) => {
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
  })
);

app.delete(
  '/dish/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Dish.findByIdAndDelete(id);
    res.redirect('/menu');
  })
);

app.all('*/*', (req, res, next) => {
  next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
  console.log('Listening to 3000');
});
