
const User = require('../models/users.model.js');

module.exports.requireAuth = function(req , res , next){
	if(!req.signedCookies.userID){
		res.redirect('/auth/login');
		return;
	}

	// var user = db.get('users').find({id: req.signedCookies.userID}).value();
	User.findOne({_id: req.signedCookies.userID},function(err,user){
		if(!user){
			res.redirect('/auth/login');
			return;
		}
		res.locals.user = user;
		next();
	})
}