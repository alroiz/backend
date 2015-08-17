var Execution = require('mongoose').model('Execution');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}
	var execution = new Execution(req.body);
	execution.save(function(err) {
		if (err) {
			//return next(err);
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			//console.log("Cabeceras enviadas:"+res.headersSent);
			res.json({"error":"The request could not be understood by the server due to malformed syntax"});			
		}
		else {
			res.json(execution);
		}
	});
};