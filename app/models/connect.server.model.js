var mongoose = require('mongoose'),
	Schema = mongoose.Schema
var util = require('util');
var schemas=require('./schemas/connect.server.schema.js');


module.exports = function(socketIoClient) {
	var ConnectSchema = new Schema(schemas.getConnectSchema());
    var ConnectDailySchema = new Schema(schemas.getConnectDailySchema());
    var ConnectMonthlySchema = new Schema(schemas.getConnectMonthlySchema());
    mongoose.model('Connect', ConnectSchema);
    mongoose.model('ConnectDaily', ConnectDailySchema);
    mongoose.model('ConnectMonthly', ConnectDailySchema);


    ConnectSchema.post('save', function (doc) {
        //Save aggregate data
        //Get a datetime that only includes date info
        var y=doc.date.getFullYear(),
            m=("0" + (doc.date.getMonth() + 1)).slice(-2),
            d=("0" + (doc.date.getDate())).slice(-2),
            h=("0" + (doc.date.getHours())).slice(-2)

        var idDaily = ""+y+m+d+"/"+ doc.app.name+"/"+doc.app.version
        var tsDaily = new Date(y,parseInt(m),parseInt(d),parseInt(h));

        var query = {
            'id': idDaily,
            'metadata.date': new Date(tsDaily.toISOString()),
            'metadata.app.name':doc.app.name,
            'metadata.app.version':doc.app.version
            },
            update={ $inc: {} };
        
        update.$inc['hourly.'+h]=1;

        var ConnectDaily = mongoose.model('ConnectDaily');
        //Check if we have a pre-allocated document. If not, create one with all fields 
        ConnectDaily.find(query, function(err,docs){
            if (docs.length===0){
                query['hourly.'+h]=1;
                var connectDaily=new ConnectDaily(query)
                connectDaily.save(/*function(err) {
                    ConnectDaily.update(query, update,  {upsert: true}, function (err, numAffected){
                        if (err){
                            console.log("Err:"+ err)    
                        }
                    });
                }*/);
            }else{
                ConnectDaily.update(query, update,  {upsert: true}, function (err, numAffected){
                    if (err){
                        console.log("Err:"+ err)    
                    }
                });                
            }
        }).limit(1);
        
        //Send message to another server to update real time stats
		socketIoClient.emit('updateConnect',doc);
		console.log('%s Connect Model has been saved', doc._id);
	});
}
