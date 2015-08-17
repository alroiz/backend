<<<<<<< HEAD
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	socketIoClient = require('./config/socketioclient'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express')
	

var socketIoCli=socketIoClient(),
	db = mongoose(socketIoCli),
	app = express()
	

//app.listen(config.port);
app.listen(process.env.PORT || 3000)


module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);
=======
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	socketIoClient = require('./config/socketioclient'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express')
	

var socketIoCli=socketIoClient(),
	db = mongoose(socketIoCli),
	app = express()
	

//app.listen(config.port);
app.listen(process.env.PORT || 3000)


module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);
>>>>>>> 3bc3a8c85906a35365ceca6142e1dc08169f25d8
console.log('webSocket Server:'+config.socketServer)