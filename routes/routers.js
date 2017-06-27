
//引入路由
var express = require('express');
var router = express.Router();
var usrs = require('./users');
var index = require('./index');
var vocabulary = require('./vocabulary');
var http = require('http');
//注册路由
usrs(router);
index(router);
vocabulary(router);

module.exports = router;