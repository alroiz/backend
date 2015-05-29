var mongoose = require('mongoose')
	//Schema = mongoose.Schema
var util = require('util');
var schemas=require('./schemas/navigation.server.schema.js');

module.exports = function(socketIoClient) {
	var NavigationSchema = schemas.getNavigationSchema();
    var NavigationDailySchema = schemas.getNavigationDailySchema();
    var NavigationMonthlySchema =schemas.getNavigationMonthlySchema();
    var NavigationYearlySchema = schemas.getNavigationYearlySchema();	

    mongoose.model('Navigation', NavigationSchema);
    mongoose.model('NavigationDaily', NavigationDailySchema);
    mongoose.model('NavigationMonthly', NavigationMonthlySchema);
    mongoose.model('NavigationYearly', NavigationYearlySchema);

	NavigationSchema.post('save', function (doc) {
        //Save aggregate data
        //Get a datetime that only includes date info
        var y=doc.date.getFullYear(),
            m=("0" + (doc.date.getMonth())).slice(-2),
            d=("0" + (doc.date.getDate())).slice(-2),
            h=parseInt(("0" + (doc.date.getHours())).slice(-2))

        //var idDaily = ""+y+m+d+"/"+doc.menu+"."+doc.option+"/"+doc.app.name+"/"+doc.app.version;
        //var idMonthly = ""+y+m+"/"+doc.menu+"."+doc.option+"/"+doc.app.name+"/"+doc.app.version;
        //var idYearly = ""+y+"/"+doc.menu+"."+doc.option+"/"+doc.app.name+"/"+doc.app.version;
        var idDaily = parseInt(""+y+m+d);
        var idMonthly = parseInt(""+y+m);
        var idYearly = parseInt(""+y);        
        var tsDaily = new Date(y,parseInt(m),parseInt(d),parseInt(h));
        var tsMonthly = new Date(y,parseInt(m),parseInt(d));
        var tsYearly = new Date(y,parseInt(m));

        var queryDaily = {
            'id': idDaily,
            'metadata.menu':doc.menu,
            'metadata.option':doc.option,
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
            	'metadata.menu':doc.menu,
            	'metadata.option':doc.option,                
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
            	'metadata.menu':doc.menu,
            	'metadata.option':doc.option,               
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

        var NavigationDaily = mongoose.model('NavigationDaily');
        var NavigationMonthly = mongoose.model('NavigationMonthly');
        var NavigationYearly = mongoose.model('NavigationYearly');

        NavigationDaily.update(queryDaily, updateDaily,  {upsert: true}, function (err, numAffected){
            //console.log (util.inspect(queryDaily));
            if (err){
                console.log("Err en daily:"+ err)    
            }
        });       

        NavigationMonthly.update(queryMonthly, updateMonthly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en monthly:"+ err)    
            }
        });

        NavigationYearly.update(queryYearly, updateYearly,  {upsert: true}, function (err, numAffected){
            if (err){
                console.log("Err en yearly:"+ err)    
            }
        });

		socketIoClient.emit('updateNavigation',doc);
		console.log('%s Navigation has been saved', doc._id);
	})
}