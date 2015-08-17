var config = require('./config'),
	mongoose = require('mongoose');


module.exports = function(socketIoCli) {
	var db = mongoose.connect(config.db);
	//console.log(config.db);
	require('../app/models/navigation.server.model')(socketIoCli);	
	require('../app/models/connect.server.model')(socketIoCli);
	require('../app/models/ad.server.model')(socketIoCli);
	require('../app/models/execution.server.model')(socketIoCli);
	require('../app/models/download.server.model')(socketIoCli);

	return db;
};