var navigation = require('../../app/controllers/navigation.server.controller');

module.exports = function(app) {
	app.route('/api/stats/navigation').post(navigation.create);
};