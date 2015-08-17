<<<<<<< HEAD
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
=======
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
>>>>>>> 3bc3a8c85906a35365ceca6142e1dc08169f25d8
};