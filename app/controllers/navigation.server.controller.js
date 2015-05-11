var Navigation = require('mongoose').model('Navigation');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}	
	var navigation = new Navigation(req.body);
	navigation.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(navigation);
		}
	});
};