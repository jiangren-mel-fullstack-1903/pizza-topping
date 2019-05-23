var express = require('express');
var router = express.Router();

toppings = [
  {id: 1, name: 'bread', image: ''},
  {id: 2, name: 'bacon', image: ''},
  {id: 3, name: 'cheese', image: ''},
];

/* GET toppings listing. */
router.get('/', function(req, res, next) {
  res.json(toppings);
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var newId = toppings[toppings.length - 1].id + 1;
  var newItem = Object.assign({}, {id: newId}, req.body);
  toppings.push(newItem);
  res.json(newItem);
});

router.get('/:id', function(req, res, next) {
  let found = toppings.find(x => x.id == req.params.id);
  res.json(found);
});

router.patch('/:id', function(req, res, next) {
  let found = toppings.find(x => x.id == req.params.id);
  Object.assign(found, req.body);
  res.json(found);
});

router.put('/:id', function(req, res, next) {
  let index = toppings.findIndex(x => x.id == req.params.id);
  let newElement = {...{id: req.params.id}, ...req.body};
  toppings[index] = newElement;
  res.json(newElement);
});

router.delete('/:id', function(req, res, next) {
  let index = toppings.findIndex(x => x.id == req.params.id);
  let removed = toppings.splice(index, 1);
  res.json(removed);
});

module.exports = router;
