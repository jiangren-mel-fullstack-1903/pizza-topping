var express = require('express');
var router = express.Router();

var toppingsRepository = require('../repositories/toppings');

/* GET toppings listing. */
router.get('/', function(req, res, next) {
  toppingsRepository.getAll().then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).send(err);
  })
});

router.post('/', function(req, res, next) {
  toppingsRepository.create(req.body).then(row => {
    res.json(row);
  }).catch(err => {
    res.status(500).send(err);
  })
});

router.get('/:id', function(req, res, next) {
  toppingsRepository.getById(req.params.id).then(row => {
    res.json(row);
  }).catch(err => {
    res.status(500).send(err);
  })
});

router.patch('/:id', function(req, res, next) {
  toppingsRepository.patch(req.params.id, req.body).then(row => {
    res.json(row);
  }).catch(err => {
    res.status(500).send(err);
  })
});

router.delete('/:id', function(req, res, next) {
  toppingsRepository.delete(req.params.id).then(row => {
    res.json(row);
  }).catch(err => {
    res.status(500).send(err);
  })
});

module.exports = router;
