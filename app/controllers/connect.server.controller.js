var Connect = require('mongoose').model('Connect');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}
	var connect = new Connect(req.body);
	connect.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(connect);
		}
	});
};