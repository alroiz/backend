var Download = require('mongoose').model('Download');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}	
	//TODO: exception and error control with params from client
	var download = new Download(req.body);
	download.save(function(err) {
		if (err) {
			//return next(err);
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			//console.log("Cabeceras enviadas:"+res.headersSent);
			res.json({"error":"The request could not be understood by the server due to malformed syntax"});			
		}
		else {
			res.json(download);
		}
	});
};