var io = require('socket.io-client')
//var io = require('socket.io')
module.exports = function() {
	var socket = io.connect('http://localhost:3002', {reconnect: true});
	socket.on('connect', function(socketOpen) { 
    	console.log('Me he conectado a http://localhost:3002!');
    	
	});	

    return socket;
};