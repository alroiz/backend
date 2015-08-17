<<<<<<< HEAD
var mongoose = require('mongoose'),
	//Schema = mongoose.Schema
	schemas=require('./schemas/execution.server.schema.js');


module.exports = function(socketIoClient) {
	var ExecutionSchema = schemas.getExecutionSchema();
    var ExecutionDailySchema = schemas.getExecutionDailySchema();
    var ExecutionMonthlySchema =schemas.getExecutionMonthlySchema();
    var ExecutionYearlySchema = schemas.getExecutionYearlySchema();		

    mongoose.model('Execution', ExecutionSchema);
    mongoose.model('ExecutionDaily', ExecutionDailySchema);
    mongoose.model('ExecutionMonthly', ExecutionMonthlySchema);
    mongoose.model('ExecutionYearly', ExecutionYearlySchema);

	ExecutionSchema.post('save', function (doc) {
        //Save aggregate data
        //Get a datetime that only includes date info
        var y=doc.date.getFullYear(),
            m=("0" + (doc.date.getMonth())).slice(-2),
            d=("0" + (doc.date.getDate())).slice(-2),
            h=parseInt(("0" + (doc.date.getHours())).slice(-2))

        //var idDaily = ""+y+m+d+"/"+doc.package+"/"+doc.app.name+"/"+doc.app.version;
        //var idMonthly = ""+y+m+"/"+doc.package+"/"+doc.app.name+"/"+doc.app.version;
        //var idYearly = ""+y+"/"+doc.package+"/"+doc.app.name+"/"+doc.app.version;
        var idDaily = parseInt(""+y+m+d);
        var idMonthly = parseInt(""+y+m);
        var idYearly = parseInt(""+y);        
        var tsDaily = new Date(y,parseInt(m),parseInt(d),parseInt(h));
        var tsMonthly = new Date(y,parseInt(m),parseInt(d));
        var tsYearly = new Date(y,parseInt(m));

        var queryDaily = {
            'id': idDaily,
            'metadata.package':doc.package,
            'metadata.app.name':doc.app.name,
            'metadata.app.version':doc.app.version,
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
            }(),
            queryMonthly = {
                'id': idMonthly,
            	'metadata.package':doc.package,
                'metadata.app.name':doc.app.name,
                'metadata.app.version':doc.app.version
            },
            updateMonthly=function(){
                var upd={ $inc: {}, $set:{} }; 
                var days=new Date(y, m+1, 0).getDate();
                for (var i=0;i<days;i++){
                    if (i===parseInt(d)-1){
                        upd.$inc['daily.'+i]=1;
                    }else{
                        upd.$inc['daily.'+i]=0;
                    }
                } 
                upd.$inc['sum']=1;        
                upd.$set['metadata.date']= new Date(tsMonthly.toISOString())         
                return upd;
            }(),

            queryYearly = {
                'id': idYearly,
            	'metadata.package':doc.package,
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

        var ExecutionDaily = mongoose.model('ExecutionDaily');
        var ExecutionMonthly = mongoose.model('ExecutionMonthly');
        var ExecutionYearly = mongoose.model('ExecutionYearly');

        ExecutionDaily.update(queryDaily, updateDaily,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en daily:"+ err)    
            }
        });       

        ExecutionMonthly.update(queryMonthly, updateMonthly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en monthly:"+ err)    
            }
        });

        ExecutionYearly.update(queryYearly, updateYearly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en yearly:"+ err)    
            }
        });


		socketIoClient.emit('updateExecution',doc);
		console.log('%s Execution has been saved', doc._id);
	})
=======
var mongoose = require('mongoose'),
	//Schema = mongoose.Schema
	schemas=require('./schemas/execution.server.schema.js');


module.exports = function(socketIoClient) {
	var ExecutionSchema = schemas.getExecutionSchema();
    var ExecutionDailySchema = schemas.getExecutionDailySchema();
    var ExecutionMonthlySchema =schemas.getExecutionMonthlySchema();
    var ExecutionYearlySchema = schemas.getExecutionYearlySchema();		

    mongoose.model('Execution', ExecutionSchema);
    mongoose.model('ExecutionDaily', ExecutionDailySchema);
    mongoose.model('ExecutionMonthly', ExecutionMonthlySchema);
    mongoose.model('ExecutionYearly', ExecutionYearlySchema);

	ExecutionSchema.post('save', function (doc) {
        //Save aggregate data
        //Get a datetime that only includes date info
        var y=doc.date.getFullYear(),
            m=("0" + (doc.date.getMonth())).slice(-2),
            d=("0" + (doc.date.getDate())).slice(-2),
            h=parseInt(("0" + (doc.date.getHours())).slice(-2))

        //var idDaily = ""+y+m+d+"/"+doc.package+"/"+doc.app.name+"/"+doc.app.version;
        //var idMonthly = ""+y+m+"/"+doc.package+"/"+doc.app.name+"/"+doc.app.version;
        //var idYearly = ""+y+"/"+doc.package+"/"+doc.app.name+"/"+doc.app.version;
        var idDaily = parseInt(""+y+m+d);
        var idMonthly = parseInt(""+y+m);
        var idYearly = parseInt(""+y);        
        var tsDaily = new Date(y,parseInt(m),parseInt(d),parseInt(h));
        var tsMonthly = new Date(y,parseInt(m),parseInt(d));
        var tsYearly = new Date(y,parseInt(m));

        var queryDaily = {
            'id': idDaily,
            'metadata.package':doc.package,
            'metadata.app.name':doc.app.name,
            'metadata.app.version':doc.app.version,
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
            }(),
            queryMonthly = {
                'id': idMonthly,
            	'metadata.package':doc.package,
                'metadata.app.name':doc.app.name,
                'metadata.app.version':doc.app.version
            },
            updateMonthly=function(){
                var upd={ $inc: {}, $set:{} }; 
                var days=new Date(y, m+1, 0).getDate();
                for (var i=0;i<days;i++){
                    if (i===parseInt(d)-1){
                        upd.$inc['daily.'+i]=1;
                    }else{
                        upd.$inc['daily.'+i]=0;
                    }
                } 
                upd.$inc['sum']=1;        
                upd.$set['metadata.date']= new Date(tsMonthly.toISOString())         
                return upd;
            }(),

            queryYearly = {
                'id': idYearly,
            	'metadata.package':doc.package,
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

        var ExecutionDaily = mongoose.model('ExecutionDaily');
        var ExecutionMonthly = mongoose.model('ExecutionMonthly');
        var ExecutionYearly = mongoose.model('ExecutionYearly');

        ExecutionDaily.update(queryDaily, updateDaily,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en daily:"+ err)    
            }
        });       

        ExecutionMonthly.update(queryMonthly, updateMonthly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en monthly:"+ err)    
            }
        });

        ExecutionYearly.update(queryYearly, updateYearly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en yearly:"+ err)    
            }
        });


		socketIoClient.emit('updateExecution',doc);
		console.log('%s Execution has been saved', doc._id);
	})
>>>>>>> 3bc3a8c85906a35365ceca6142e1dc08169f25d8
}