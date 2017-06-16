
module.exports = function (router) {
/*	var express = require('express');
	var router = express.Router();*/
	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index',{title:"express"});
	});
	router.get('/getjson',function(req,res,next){
		res.json({
			a:"a",
			b:"b",
			c:"c"
		})
	});
	router.post('/postdata',function(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");  
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
	    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");  
		console.log(req.body.username,req.body.password)
		var username = req.body.username;
		var password = req.body.password;
		if(username ==="huxiang"&&password === "111"){
			res.json({message:"login success!!"});
		}else{
			res.json({message:"login failure!!"});
		}
	});
	/*module.exports = router;*/
}
