const mongoose = require('mongoose');

const Dish = require('./models/dish');

mongoose
  .connect('mongodb://localhost:27017/restaurantApp')
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('Oops, something went wrong:');
    console.log(err);
  });

(async () => {
  await Dish.deleteMany({});
})();

const seedDishes = [
  {
    name: 'Zeeuwse platte oester',
    ingredients: ['appel', 'shiso', 'sudachi'],
    price: 21.0,
    course: 'voorgerecht',
  },
  {
    name: "St-Jakobsvrucht 'dieppe'",
    ingredients: ['savooi', 'parmezaan', 'peterselie'],
    price: 18.0,
    course: 'voorgerecht',
  },
  {
    name: "Kabeljauw 'Noordzee'",
    ingredients: ['miso', 'aardpeer', 'champignon'],
    price: 17.5,
    course: 'voorgerecht',
  },
  {
    name: "Langoustine 'Guilvinec'",
    ingredients: ['verbena', 'edamame', 'courgette'],
    price: 16.5,
    course: 'voorgerecht',
  },
  {
    name: "Kaviaar 'selectie Norevad'",
    ingredients: ['langoustine', 'prei'],
    price: 23.5,
    course: 'voorgerecht',
  },
  {
    name: 'Koningskrab',
    ingredients: ['chermoula', 'maïs', 'mimolette'],
    price: 21.0,
    course: 'hoofdgerecht',
  },
  {
    name: 'Hoevekip',
    ingredients: ['artisjok', 'aubergine', 'vin jaune'],
    price: 18.0,
    course: 'hoofdgerecht',
  },
  {
    name: 'Kalfszwezerik',
    ingredients: ['zwarte truffel', 'bloemkool', 'ganzenlever'],
    price: 22.0,
    course: 'hoofdgerecht',
  },
  {
    name: "Haas 'van bij ons'",
    ingredients: ['knolselder', 'witloof', 'poivrade'],
    price: 16.5,
    course: 'hoofdgerecht',
  },
  {
    name: 'Gegrilde tarbot',
    ingredients: ['kreeftenbearnaise', 'puree van bouillabaisse'],
    price: 23.5,
    course: 'hoofdgerecht',
  },
  {
    name: "Jonge duif 'Anjou'",
    ingredients: ['aardappelmousseline', 'zwarte truffel'],
    price: 23.5,
    course: 'hoofdgerecht',
  },
  {
    name: 'Perzik',
    ingredients: ['samba', 'yoghurt', 'walnoot', 'australian bush'],
    price: 21.0,
    course: 'dessert',
  },
  {
    name: 'Persimmon',
    ingredients: ['jivara', 'pinda', 'sake droesem', 'mandarijn'],
    price: 18.0,
    course: 'dessert',
  },
  {
    name: 'Baba',
    ingredients: ['palmsuiker', 'miso'],
    price: 17.5,
    course: 'dessert',
  },
  {
    name: 'Citrus',
    ingredients: ['Kokosnoot', 'koffie', 'citroengras'],
    price: 16.5,
    course: 'dessert',
  },
];

Dish.insertMany(seedDishes)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
