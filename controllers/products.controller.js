// const db = require('../db.js');
const Product = require('../models/products.model.js');

module.exports.index = async function(req , res, next){
	// var page = parseInt(req.query.page) || 1; //n
	// var perPage = 4; //x

	// var start = (page-1)*perPage;
	// var end = page*perPage;
	// var begin = start/perPage + 1 ;
	// res.render('products/index',{
	// 	//products: db.get('products').value().slice(start, end)
	// 	products: db.get('products').drop(start).take(perPage).value(),
	// 	lengths: db.get('products').value().length,
	// 	begin: begin,
	// 	page: page
	// });
	try {
		var products = await Product.find();
		res.render('products/index',{
			products: products
		})
	} catch(e) {
		next(e);
	}
	
};
