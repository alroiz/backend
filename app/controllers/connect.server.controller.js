<<<<<<< HEAD
var Connect = require('mongoose').model('Connect');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}
	var connect = new Connect(req.body);
	connect.save(function(err) {
		if (err) {
			//return next(err);
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			//console.log("Cabeceras enviadas:"+res.headersSent);
			res.json({"error":"The request could not be understood by the server due to malformed syntax"});			
		}
		else {
			res.json(connect);
		}
	});
=======
var Connect = require('mongoose').model('Connect');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}
	var connect = new Connect(req.body);
	connect.save(function(err) {
		if (err) {
			//return next(err);
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			//console.log("Cabeceras enviadas:"+res.headersSent);
			res.json({"error":"The request could not be understood by the server due to malformed syntax"});			
		}
		else {
			res.json(connect);
		}
	});
>>>>>>> 3bc3a8c85906a35365ceca6142e1dc08169f25d8
};