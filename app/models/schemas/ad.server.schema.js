
var mongoose = require('mongoose'),
Schema = mongoose.Schema

exports.getAdSchema = function() {	
    return new Schema({
        app:{
            name: { type: String, required:true, default: "myApp"},
            version: { type: String, required:true, default:"0"}
        },
        date: { type: Date, default: Date.now },
        mac: { type:String, required:true},
        ip: { type:String, required:true},
        banner: { type:String, required:true}
    })
};

exports.getAdDailySchema = function() {	
	return new Schema({
        id: { type: String, required:true},
        metadata: {
            date: { type: Date, required:true },//Day scope
            banner: { type:String, required:true, default:"myBanner"},
            app:{
                name: { type: String, required:true,default: "myApp"},
                version: { type: String, required:true, default:"0"}
            }
        },
        sum:{ type: Number, default:0},
        hourly:{
            "0":{ type: Number, default:0},
            "1":{ type: Number, default:0},
            "2":{ type: Number, default:0},
            "3":{ type: Number, default:0},
            "4":{ type: Number, default:0},
            "5":{ type: Number, default:0},
            "6":{ type: Number, default:0},
            "7":{ type: Number, default:0},
            "8":{ type: Number, default:0},
            "9":{ type: Number, default:0},
            "10":{ type: Number, default:0},
            "11":{ type: Number, default:0},
            "12":{ type: Number, default:0},
            "13":{ type: Number, default:0},
            "14":{ type: Number, default:0},
            "15":{ type: Number, default:0},
            "16":{ type: Number, default:0},
            "17":{ type: Number, default:0},
            "18":{ type: Number, default:0},
            "19":{ type: Number, default:0},
            "20":{ type: Number, default:0},
            "21":{ type: Number, default:0},
            "22":{ type: Number, default:0},
            "23":{ type: Number, default:0}
        }
    })
};

exports.getAdMonthlySchema = function() {	
    return new Schema({
        id: { type: String, required:true},
        metadata: {
            date: { type: Date, required:true },//Day scope
            banner: { type:String, required:true, default:"myBanner"},
            app:{
                name: { type: String, required:true,default: "myApp"},
                version: { type: String, required:true, default:"0"}
            }
        },
        sum:{ type: Number, default:0},
        daily:{
            "0":{ type: Number, default:0},
            "1":{ type: Number, default:0},
            "2":{ type: Number, default:0},
            "3":{ type: Number, default:0},
            "4":{ type: Number, default:0},
            "5":{ type: Number, default:0},
            "6":{ type: Number, default:0},
            "7":{ type: Number, default:0},
            "8":{ type: Number, default:0},
            "9":{ type: Number, default:0},
            "10":{ type: Number, default:0},
            "11":{ type: Number, default:0},
            "12":{ type: Number, default:0},
            "13":{ type: Number, default:0},
            "14":{ type: Number, default:0},
            "15":{ type: Number, default:0},
            "16":{ type: Number, default:0},
            "17":{ type: Number, default:0},
            "18":{ type: Number, default:0},
            "19":{ type: Number, default:0},
            "20":{ type: Number, default:0},
            "21":{ type: Number, default:0},
            "22":{ type: Number, default:0},
            "23":{ type: Number, default:0},
            "24":{ type: Number, default:0},
            "25":{ type: Number, default:0},           
            "26":{ type: Number, default:0},
            "27":{ type: Number, default:0},            
            "28":{ type: Number, default:0},
            "29":{ type: Number, default:0},           
            "30":{ type: Number, default:0},
            "31":{ type: Number, default:0} 
        }
    })
};

exports.getAdYearlySchema = function() {	
    return new Schema({
        id: { type: String, required:true},
        metadata: {
            date: { type: Date, required:true },//Day scope
            banner: { type:String, required:true, default:"myBanner"},
            app:{
                name: { type: String, required:true,default: "myApp"},
                version: { type: String, required:true, default:"0"}
            }
        },
        sum:{ type: Number, default:0},
        monthly:{
            "0":{ type: Number, default:0},
            "1":{ type: Number, default:0},
            "2":{ type: Number, default:0},
            "3":{ type: Number, default:0},
            "4":{ type: Number, default:0},
            "5":{ type: Number, default:0},
            "6":{ type: Number, default:0},
            "7":{ type: Number, default:0},
            "8":{ type: Number, default:0},
            "9":{ type: Number, default:0},
            "10":{ type: Number, default:0},
            "11":{ type: Number, default:0}
        }
    })
};