var Execution = require('mongoose').model('Execution');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}
	var execution = new Execution(req.body);
	execution.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(execution);
		}
	});
};