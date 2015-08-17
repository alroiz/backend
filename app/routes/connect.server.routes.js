var connect = require('../../app/controllers/connect.server.controller');

module.exports = function(app) {
	app.route('/api/stats/connect').post(connect.create);
};