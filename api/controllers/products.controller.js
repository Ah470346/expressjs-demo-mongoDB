const Product = require('../../models/products.model.js');

module.exports.index = async function(req , res){
	Product.find().then(function(products){
		res.json(products)
	})
};

module.exports.create = async function(req , res){
	var product = await Product.create(req.body);
	res.json(product);
};