var mongoose = require('mongoose'),
	Schema = mongoose.Schema
var util = require('util');
var schemas=require('./schemas/connect.server.schema.js');


module.exports = function(socketIoClient) {
	var ConnectSchema = new Schema(schemas.getConnectSchema());
    var ConnectDailySchema = new Schema(schemas.getConnectDailySchema());
    var ConnectMonthlySchema = new Schema(schemas.getConnectMonthlySchema());
    var ConnectYearlySchema = new Schema(schemas.getConnectYearlySchema());
    mongoose.model('Connect', ConnectSchema);
    mongoose.model('ConnectDaily', ConnectDailySchema);
    mongoose.model('ConnectMonthly', ConnectMonthlySchema);
    mongoose.model('ConnectYearly', ConnectYearlySchema);


    ConnectSchema.post('save', function (doc) {
        //Save aggregate data
        //Get a datetime that only includes date info
        var y=doc.date.getFullYear(),
            m=("0" + (doc.date.getMonth())).slice(-2),
            d=("0" + (doc.date.getDate())).slice(-2),
            h=parseInt(("0" + (doc.date.getHours())).slice(-2))

        var idDaily = ""+y+m+d+"/"+ doc.app.name+"/"+doc.app.version;
        var idMonthly = ""+y+m+"/"+ doc.app.name+"/"+doc.app.version;
        var idYearly = ""+y+"/"+ doc.app.name+"/"+doc.app.version;
        var tsDaily = new Date(y,parseInt(m),parseInt(d),parseInt(h));
        var tsMonthly = new Date(y,parseInt(m),parseInt(d));
        var tsYearly = new Date(y,parseInt(m));

        var queryDaily = {
            'id': idDaily,
            'metadata.app.name':doc.app.name,
            'metadata.app.version':doc.app.version
            },
            updateDaily=function(){
                var upd={ $inc: {}, $set:{} };
                for (var i=0;i<24;i++){
                    if (i===h){
                        upd.$inc['hourly.'+i]=1;
                    }else{
                        upd.$inc['hourly.'+i]=0;
                    }
                }
                upd.$inc['sum']=1;     
                upd.$set['metadata.date']= new Date(tsDaily.toISOString())      
                return upd;
            }()

        var queryMonthly = {
            'id': idMonthly,
            'metadata.app.name':doc.app.name,
            'metadata.app.version':doc.app.version
            },
            updateMonthly=function(){
                var upd={ $inc: {}, $set:{} }; 
                var days=new Date(y, m, 0).getDate();
                for (var i=0;i<days;i++){
                    if (i===parseInt(d)){
                        upd.$inc['daily.'+i]=1;
                    }else{
                        upd.$inc['daily.'+i]=0;
                    }
                } 
                upd.$inc['sum']=1;        
                upd.$set['metadata.date']= new Date(tsMonthly.toISOString())         
                return upd;
            }();

        var queryYearly = {
            'id': idYearly,
            'metadata.app.name':doc.app.name,
            'metadata.app.version':doc.app.version
            },
            updateYearly=function(){
                var upd={ $inc: {}, $set:{} }; 
                //var days=new Date(y, m, 0).getDate();
                for (var i=0;i<12;i++){
                    if (i===parseInt(m)){
                        upd.$inc['monthly.'+i]=1;
                    }else{
                        upd.$inc['monthly.'+i]=0;
                    }
                }      
                upd.$inc['sum']=1;   
                upd.$set['metadata.date']= new Date(tsYearly.toISOString())         
                return upd;
            }();            

        var ConnectDaily = mongoose.model('ConnectDaily');
        var ConnectMonthly = mongoose.model('ConnectMonthly');
        var ConnectYearly = mongoose.model('ConnectYearly');
        //Check if we have a pre-allocated document. If not, create one with all fields 
        /*ConnectDaily.find(query, function(err,docs){
            if (docs.length===0){
                var connectDaily=new ConnectDaily(query)
                connectDaily.save(function(err) {
                    ConnectDaily.update(query, update,  {upsert: true}, function (err, numAffected){
                        if (err){
                            console.log("Err:"+ err)    
                        }
                    });
                });
            }else{
                ConnectDaily.update(query, update,  {upsert: true}, function (err, numAffected){
                    if (err){
                        console.log("Err:"+ err)    
                    }
                });                
            }
        }).limit(1);*/
        ConnectDaily.update(queryDaily, updateDaily,  {upsert: true}, function (err, numAffected){
            //console.log (util.inspect(queryDaily));
            if (err){
                console.log("Err en daily:"+ err)    
            }
        });       

        ConnectMonthly.update(queryMonthly, updateMonthly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en monthly:"+ err)    
            }
        });

        ConnectYearly.update(queryYearly, updateYearly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en yearly:"+ err)    
            }
        });        
        //Send message to another server to update real time stats
		socketIoClient.emit('updateConnect',doc);
		console.log('%s Connect Model has been saved', doc._id);
	});
}