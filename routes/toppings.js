var express = require('express');
var router = express.Router();

var ToppingModel = require('../repositories/toppings');

/* GET toppings listing. */
router.get('/', function (req, res, next) {
  ToppingModel.find((err, toppings) => {
    if (err) return res.status(500).send(err);
    return res.json(toppings);
  });
});

router.post('/', function (req, res, next) {
  const newTopping = new ToppingModel(req.body);
  newTopping.save(err => {
    if (err) return res.status(500).send(err);
    return res.json(newTopping);
  });
});

router.get('/:id', function (req, res, next) {
  ToppingModel.findById(req.params.id, (err, topping) => {
    if (err) return res.status(500).send(err);
    return res.json(topping);
  });
});

router.patch('/:id', function (req, res, next) {
  ToppingModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, topping) => {
    if (err) return res.status(500).send(err);
    return res.json(topping);
  });
});

router.put('/:id', function (req, res, next) {
  ToppingModel.replaceOne({ _id: req.params.id }, req.body, (err, topping) => {
    if (err) return res.status(500).send(err);
    ToppingModel.findById(req.params.id, (err, found) => {
      if (err) return res.status(500).send(err);
      return res.json(found);
    })
  });
});

router.delete('/:id', function (req, res, next) {
  ToppingModel.findByIdAndRemove(req.params.id, (err, topping) => {
    if (err) return res.status(500).send(err);
    return res.json(topping);
  });
});

module.exports = router;
