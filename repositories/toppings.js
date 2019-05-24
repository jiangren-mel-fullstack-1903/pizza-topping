var mongoose = require('mongoose');

var ToppingSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    price: Number
});

var toppingMongooseModel = mongoose.model('Topping', ToppingSchema);

module.exports = toppingMongooseModel;