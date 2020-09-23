
// const db = require('../db.js');
// const shortid = require('shortid');
const User = require('../models/users.model.js');

module.exports.index = function(req,res){
	// res.render('users/index',{
	// 	users: db.get('users').value()
	// });
	User.find().then(function(users){
		res.render('users/index',{
			users: users
		})
	})
};

module.exports.search = function(req,res){
	var q = req.query.q;
	// var matchedUsers = db.get('users').value().filter(function(user){
	// 	return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
	// });
	// res.render('users/index', {
	// 	users: matchedUsers,
	// 	q: q
	// })
	User.find().then(function(users){
		var matchedUsers = users.filter(function(user) {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
		});
		res.render('users/index',{
			users: matchedUsers,
			q: q
		})
	})
};

module.exports.create = function(req,res){
	res.render('users/create');
};

module.exports.get = function(req,res){
	var id = req.params.id; // lấy về params :id
	// var users = db.get('users').find({ id: id}).value();

	// res.render('users/view',{
	// 	user: users
	// });
	User.findById(id).then(function(user){
		res.render('users/view',{
			user: user
		});
	})
};

module.exports.postCreate = function(req,res){
	req.body.avatar = req.file.path.split("\\").slice(1).join("/");
	var user = new User({
		name: req.body.name ,
		email: req.body.email,
		password: req.body.password,
		phone: req.body.phone,
		avatar: req.body.avatar
	})
	user.save(function(err,user){
		if(err) return console.error(err);
		console.log(user.name + " saved to bookstore collection.");

	})
	res.redirect('/user');
};
