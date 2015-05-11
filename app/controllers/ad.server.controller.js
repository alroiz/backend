var Ad = require('mongoose').model('Ad');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}	
	var ad = new Ad(req.body);
	ad.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(ad);
		}
	});
};