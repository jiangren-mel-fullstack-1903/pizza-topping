var express = require('express');
var router = express.Router();

var toppingsRepository = require('../repositories/toppings');

/* GET toppings listing. */
router.get('/', async function(req, res, next) {
  try {
    let rows = await toppingsRepository.getAll();
    res.json(rows);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    let row = await toppingsRepository.create(req.body);
    res.json(row);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    let row = await toppingsRepository.getById(req.params.id);
    res.json(row);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    let row = await toppingsRepository.patch(req.params.id, req.body);
    res.json(row);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let row = await toppingsRepository.delete(req.params.id);
    res.json(row);
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = router;
