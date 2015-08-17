<<<<<<< HEAD
var io = require('socket.io-client')
//var io = require('socket.io')
module.exports = function() {
	//var socket = io.connect('https://dashboardcvte.herokuapp.com/', {reconnect: true});
	var socket = io.connect('http://localhost:3002/', {reconnect: true});
	socket.on('connect', function(socketOpen) { 
    	console.log('Me he conectado a http://localhost:3002!');
    	
	});	

    return socket;
=======
var io = require('socket.io-client')
//var io = require('socket.io')
module.exports = function() {
	//var socket = io.connect('https://dashboardcvte.herokuapp.com/', {reconnect: true});
	var socket = io.connect('http://localhost:3002/', {reconnect: true});
	socket.on('connect', function(socketOpen) { 
    	console.log('Me he conectado a http://localhost:3002!');
    	
	});	

    return socket;
>>>>>>> 3bc3a8c85906a35365ceca6142e1dc08169f25d8
};