const mongoose = require('mongoose');

var productsSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	price: Number
});
var Product = mongoose.model('Product',productsSchema,'products');

module.exports = Product; 
