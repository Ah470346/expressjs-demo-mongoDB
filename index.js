require('dotenv').config();
const express = require('express');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
mongoose.connect(process.env.URL_MONGO, {useNewUrlParser: true});

const usersRoutes = require('./routes/users.route.js');
const authRoutes = require('./routes/auth.route.js');
const productsRoutes = require('./routes/products.route.js');
const cartRoutes = require('./routes/cart.route.js');
const apiProductsRoutes = require('./api/routes/products.route.js');
const transferRoutes = require('./routes/transfer.route.js');
const authMiddleware = require('./middleware/auth.middleware.js');
const sessionMiddleware = require('./middleware/session.middleware.js');
const cartMiddleware = require('./middleware/cart.middleware.js');


// pug
app.set('view engine', 'pug')
app.set('views', './views');

// config req.body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));

app.get('/', function(req,res){
	res.render('index',{
		name: 'AAA' //truyền tham số để trình duyệt nhận vào
	});
})

app.use('/user',
	sessionMiddleware.session,
	cartMiddleware.cart,
	authMiddleware.requireAuth,
	usersRoutes);
app.use('/auth', 
	sessionMiddleware.session,
	cartMiddleware.cart,
	authRoutes);
app.use('/products',
	sessionMiddleware.session,
	cartMiddleware.cart,
	authMiddleware.requireAuth,
	productsRoutes);
app.use('/cart',
	sessionMiddleware.session,
	cartMiddleware.cart,
	authMiddleware.requireAuth ,
	cartRoutes);
app.use('/transfer',
	csurf({cookie: true}),
	sessionMiddleware.session,
	cartMiddleware.cart,
	authMiddleware.requireAuth , 
	transferRoutes);

app.use('/api/products',apiProductsRoutes);

app.listen(port , function(){
	console.log('server listening on port ' + port);
})