var mongoose = require('mongoose'),
	Schema = mongoose.Schema

module.exports = function(socketIoClient) {
	var ConnectSchema = new Schema({
		id: String,
		date: { type: Date, default: Date.now },
		mac: String,
		ip: String
	});

	ConnectSchema.post('save', function (doc) {
		socketIoClient.emit('updateConnect',doc);
		console.log('%s Connect Model has been saved', doc._id);
		
	});

	mongoose.model('Connect', ConnectSchema);
}