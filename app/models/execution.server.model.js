var mongoose = require('mongoose'),
	Schema = mongoose.Schema


module.exports = function(socketIoClient) {
	var ExecutionSchema = new Schema({
		id: String,
		date: {type: Date, default: Date.now},
		mac: String,
		ip: String,
		package: String
	});

	ExecutionSchema.post('save', function (doc) {
		socketIoClient.emit('updateExecution',doc);
		console.log('%s has been saved', doc._id);
	})

	mongoose.model('Execution', ExecutionSchema);
}