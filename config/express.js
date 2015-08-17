var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function() {
    var app = express();
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/connect.server.routes.js')(app);
    require('../app/routes/navigation.server.routes.js')(app);
    require('../app/routes/ad.server.routes.js')(app);
    require('../app/routes/execution.server.routes.js')(app);
    require('../app/routes/download.server.routes.js')(app);
    return app;
};