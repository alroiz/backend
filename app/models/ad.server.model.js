var mongoose = require('mongoose'),
	Schema = mongoose.Schema

module.exports = function(socketIoClient) {
	var AdSchema = new Schema({
		id: { type: String, required:true},
		date: { type: Date, default: Date.now },
		mac: { type:String, required:true},
		ip: { type:String, required:true},
		banner: { type:String, required:true}

		/*id: String,
		date: { type: Date, default: Date.now },
		mac: String,
		ip: String,
		banner: String*/
	});

	AdSchema.post('save', function (doc) {
		socketIoClient.emit('updateAd',doc);
		console.log('%s Connect Ad has been saved', doc._id);
		
	});

	mongoose.model('Ad', AdSchema);
};
