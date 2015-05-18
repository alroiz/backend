var mongoose = require('mongoose'),
	Schema = mongoose.Schema

module.exports = function(socketIoClient) {
	var NavigationSchema = new Schema({
		id: { type: String, required:true},
		date: { type: Date, default: Date.now },
		mac: { type:String, required:true},
		ip: { type:String, required:true},
		menu: { type:String, required:true},
		option: { type:String, required:true}
	});

	NavigationSchema.post('save', function (doc) {
		socketIoClient.emit('updateNavigation',doc);
		console.log('%s has been saved', doc._id);
	})

	mongoose.model('Navigation', NavigationSchema);
}