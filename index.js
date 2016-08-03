var express = require('express');
var bodyParser = require('body-parser');  //express的中间件，用来解析post参数，用于解析客户端请求的body中的内容,内部
//使用JSON编码处理,url编码处理以及对于文件的上传处理.
var mysql =require('mysql');

var app = express();
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'mysql123',
	database:'blog'
});
//获取数据库连接

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/static',express.static('static'));
app.set('view engine', 'jade');
app.set('views', './views');
app.get('/', function (req, res) {
 res.send('Hello World!');
});
//使用post方式获取参数
app.post('/testmysql',function(req, res){    //配置路由当访问/testmysql时执行向数据库添加数据操作
	addWords(req.body,res); //获取数据
})
//使用get方式获取参数
//app.get('/testmysql',function(req, res){
//	addWords(req.query,res); //获取数据
//})
app.get('/hello', function (req, res) {
	res.render('hello',{});
});
app.get('/msglist', function (req, res) {
	connection.query('SELECT * FROM words;',function(err,results){
		if(err){
			console.error('selectWords error'+err.stack);
			return;
		}
		res.send(results);
	});
});
app.listen(3000, function () {
  console.log('Example app listening at 3000');
});
function addWords(paramHash, res){
	connection.query('insert into words (name,age,liuyan) values ("'+paramHash["a"]+'","'+paramHash["b"]+'","'+paramHash["c"]+'");', function(err){
		if(err){
			console.error('error connectiong:'+err.stack);
			return;
		}
		res.send({"status":"ok"});
	});
}


