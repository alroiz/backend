var mongoose = require('mongoose'),
	Schema = mongoose.Schema

module.exports = function(socketIoClient) {
	var DownloadSchema = new Schema({
		id: String,
		date: {type: Date, default: Date.now},
		mac: String,
		ip: String,
		package: String,
		type: String
	});

	DownloadSchema.post('save', function (doc) {
		socketIoClient.emit('updateDownload',doc);
		console.log('%s has been saved', doc._id);
	})

	mongoose.model('Download', DownloadSchema);
}