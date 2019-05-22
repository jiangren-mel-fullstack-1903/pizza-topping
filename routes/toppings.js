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


module.exports = router;
