var mongoose = require('mongoose'),
	Schema = mongoose.Schema

module.exports = function(socketIoClient) {
	var DownloadSchema = new Schema({
		id: { type: String, required:true},
		date: { type: Date, default: Date.now },
		mac: { type:String, required:true},
		ip: { type:String, required:true},
		package: { type:String, required:true},
		type: { type:String, required:true}
	});

	DownloadSchema.post('save', function (doc) {
		socketIoClient.emit('updateDownload',doc);
		console.log('%s has been saved', doc._id);
	})

	mongoose.model('Download', DownloadSchema);
}