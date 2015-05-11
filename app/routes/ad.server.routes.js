var ad = require('../../app/controllers/ad.server.controller');

module.exports = function(app) {
	app.route('/api/stats/ad').post(ad.create);
};