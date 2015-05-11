var execution = require('../../app/controllers/execution.server.controller');

module.exports = function(app) {
	app.route('/api/stats/execution').post(execution.create);
};