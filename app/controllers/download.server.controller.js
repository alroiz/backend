var Download = require('mongoose').model('Download');

exports.create = function(req, res, next) {	
	if (req.body.date){
		var _date=new Date(req.body.date);
		req.body.date=_date.toISOString();	
	}	
	var download = new Download(req.body);
	download.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(download);
		}
	});
};