/*var http = require('http');
var fs = require('fs');
var mysql =require('mysql');

var server = http.createServer(function(req,res){
	if(/\/testmysql/.test(req.url)){
		var paramStr = /\/testmysql\?(.+)/.exec(req.url)[1];
		var params = paramStr.split('&');
		var paramHash = {};
		params.forEach(function (param) {
			paramHash[param.split("=")[0]]=param.split("=")[1];
		})
		addWords(paramHash);
	}
	req.on('data',function(data){
		console.log("服务器接收到的数据："+decodeURIComponent(data));
	});
	req.on("end",function(){
		console.log('客户端请求数据全部接收完毕');
	});
	res.end();
}).listen(1337,"localhost",function(){
	console.log("listened");
});

function addWords(paramHash){
	var connection = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'mysql123',
		database:'blog'
	});
	connection.query('insert into words (name,age,liuyan) values ("'+paramHash["a"]+'","'+paramHash["b"]+'","'+paramHash["c"]+'");', function(err){
		if(err){
		console.error('error connectiong:'+err.stack);
		return;
		}
	});
}
