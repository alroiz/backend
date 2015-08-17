var download = require('../../app/controllers/download.server.controller');

module.exports = function(app) {
	app.route('/api/stats/download').post(download.create);
};