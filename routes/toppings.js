var express = require('express');
var router = express.Router();

var toppingsRepository = require('../repositories/toppings');

/* GET toppings listing. */
router.get('/', function(req, res, next) {
  toppingsRepository.getAll((err, rows) => {
    if (err) res.status(500).send(err);
    else res.json(rows);
  })
});

router.post('/', function(req, res, next) {
  toppingsRepository.create(req.body, (err, row) => {
    if (err) res.status(500).send(err);
    else res.json(row);
  });
});

router.get('/:id', function(req, res, next) {
  toppingsRepository.getById(req.params.id, (err, row) => {
    if (err) res.status(500).send(err);
    else res.json(row);
  });
});

router.patch('/:id', function(req, res, next) {
  toppingsRepository.patch(req.params.id, req.body, (err, row) => {
    if (err) res.status(500).json(err);
    else res.json(row);
  });
});

router.delete('/:id', function(req, res, next) {
  toppingsRepository.delete(req.params.id, (err, row) => {
    if (err) res.status(500).send(err);
    else res.json(row);
  });
});

module.exports = router;
