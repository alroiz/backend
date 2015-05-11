var mongoose = require('mongoose'),
	Schema = mongoose.Schema

module.exports = function(socketIoClient) {
	var NavigationSchema = new Schema({
		id: String,
		date: {type: Date, default: Date.now},
		mac: String,
		ip: String,
		menu: String,
		option: String
	});

	NavigationSchema.post('save', function (doc) {
		socketIoClient.emit('updateNavigation',doc);
		console.log('%s has been saved', doc._id);
	})

	mongoose.model('Navigation', NavigationSchema);
}