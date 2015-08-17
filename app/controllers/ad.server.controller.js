<<<<<<< HEAD
var Ad = require('mongoose').model('Ad');

exports.create = function(req, res) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}	
	try{
		var ad = new Ad(req.body);
	} catch(e){
		console.log("Error al crear el modelo");
	}
	ad.save(function(err) {
		//console.log(err);
		if (err) {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			//console.log("Cabeceras enviadas:"+res.headersSent);
			res.json({"error":"The request could not be understood by the server due to malformed syntax"});
		}
		else {
			res.json(ad);
		}
	});
=======
var Ad = require('mongoose').model('Ad');

exports.create = function(req, res) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}	
	try{
		var ad = new Ad(req.body);
	} catch(e){
		console.log("Error al crear el modelo");
	}
	ad.save(function(err) {
		//console.log(err);
		if (err) {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			//console.log("Cabeceras enviadas:"+res.headersSent);
			res.json({"error":"The request could not be understood by the server due to malformed syntax"});
		}
		else {
			res.json(ad);
		}
	});
>>>>>>> 3bc3a8c85906a35365ceca6142e1dc08169f25d8
};