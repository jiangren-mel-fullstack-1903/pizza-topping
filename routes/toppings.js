var express = require('express');
var router = express.Router();

var toppingsRepository = require('../repositories/toppings');

/* GET toppings listing. */
router.get('/', function(req, res, next) {
  res.json(toppingsRepository.getAll());
});

router.post('/', function(req, res, next) {
  try {
    let newItem = toppingsRepository.create(req.body);
    res.json(newItem);
  } catch(e) {
    res.status(401).send(e);
  }
});

router.get('/:id', function(req, res, next) {
  try {
    let found = toppingsRepository.getById(req.params.id);
    res.json(found);
  } catch (e) {
    res.status(402).send(e);
  }
});

router.patch('/:id', function(req, res, next) {
  let found = toppingsRepository.patch(req.params.id, req.body);
  res.json(found);
});

router.put('/:id', function(req, res, next) {
  let newElement = toppingsRepository.put(req.params.id, req.body);
  res.json(newElement);
});

router.delete('/:id', function(req, res, next) {
  let removed = toppingsRepository.delete(req.params.id);
  res.json(removed);
});

module.exports = router;
