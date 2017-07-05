module.exports = function(router) {
	/*var express = require('express');
	var router = express.Router();*/
	/* GET users listing. */
	router.get('/vocabulary', function(req, res, next) {
		var json = [{
			"pid": "001",
			"imgurl": "",
			"classid": "",
			"name": "分类主题一体化表",
			"list": [{
				"pid": "002",
				"imgurl": "",
				"classid": "D4",
				"name": "工人、农民 青年 妇女运动",
				"url": "#a1",
				"list": [{
					"pid": "003",
					"imgurl": "",
					"classid": "D41",
					"name": "工人运动与组织",
					"list": [{
						"pid": "004",
						"imgurl": "",
						"classid": "D410",
						"name": "工人运动与理论",
						"url": "#a1",
					}, {
						"pid": "005",
						"imgurl": "",
						"classid": "D410",
						"name": "世界工人运动与组织",
						"url": "#a1",
					}, {
						"pid": "006",
						"imgurl": "",
						"classid": "D412",
						"name": "中国工人运动与组织",
						"url": "#a1",
						"list": [{
							"pid": "007",
							"imgurl": "",
							"classid": "D412.0",
							"name": "党对工人运动的领导",
							"url": "#a1",
						}, {
							"pid": "008",
							"imgurl": "",
							"classid": "D412.1",
							"name": "工人章程、条例",
							"url": "#a1",
						}, {
							"pid": "009",
							"imgurl": "",
							"classid": "D412.2",
							"name": "工人组织与会议",
							"url": "#a1",
						}, {
							"pid": "010",
							"imgurl": "",
							"classid": "D412.6",
							"name": "公会工作",
							"url": "#a1",
						}, {
							"pid": "011",
							"imgurl": "",
							"classid": "D412.7",
							"name": "工人生活状况",
							"url": "#a1",
						}, {
							"pid": "012",
							"imgurl": "",
							"status": "1",
							"classid": "D412.8",
							"name": "地方工人运动与组织",
							"url": "#a1",
						}, {
							"pid": "014",
							"imgurl": "",
							"status": "1",
							"classid": "[D412.9]",
							"name": "工人运动史",
							"url": "#a1",
						}]
					}, {
						"pid": "015",
						"imgurl": "",
						"status": "1",
						"classid": "D413/D417",
						"name": "各国工人运动与组织",
						"url": "#a1",
					}]
				}]
			}]
		}]
		res.json(json);
	});
	/*批量查询*/
	router.post('/multigroupquery', function(req, res, next) {
		var multigroupqueryjson = [{
			"classifytype": "使用类",
			"classifyid": "B2",
			"classifyname": "中国哲学",
			"recordcontrolnum": "c011246",
		}, {
			"classifytype": "起止类",
			"classifyid": "B21/B26",
			"classifyname": "B21/B26",
			"recordcontrolnum": "c011245",
		}, {
			"classifytype": "交替类",
			"classifyid": "B019.2",
			"classifyname": "唯心主义",
			"recordcontrolnum": "c011243",
		}]
		res.json(multigroupqueryjson);
	});
	/**/
	router.all('/getmarcdata', function(request, response, next) {
		var type = request.body.type;
		var marcdata = "";
		console.log(type === "classify");
		console.log(type === "theme");
		if (type === "classify") {
			marcdata = [{
				"marcverification": "",
				"fieldnum": "001",
				"designator": "",
				"fieldcontent": "C055480",
			}, {
				"marcverification": "",
				"fieldnum": "005",
				"designator": "",
				"fieldcontent": "20170331092907.0",
			}, {
				"marcverification": "",
				"fieldnum": "024",
				"designator": "",
				"fieldcontent": "00000cw   2200000 a 45",
			}, {
				"marcverification": "",
				"fieldnum": "100",
				"designator": "",
				"fieldcontent": "^a20170417aaaa abbachiy0108      ea",
			}, {
				"marcverification": "",
				"fieldnum": "184",
				"designator": "0 ",
				"fieldcontent": "^aCLC^b中国图书馆分类法^c5^echi",
			}, {
				"marcverification": "",
				"fieldnum": "250",
				"designator": "0 ",
				"fieldcontent": "^d03^aB21^9B^h哲学^j",
			}, {
				"marcverification": "",
				"fieldnum": "330",
				"designator": "0 ",
				"fieldcontent": "^a运用马克思列宁主义、毛泽东思想、邓小平理论对各学科门类的专题研究，按其内容分入有关各类。例：马克思主义哲学入B0-0，科学社会主义理论入D0-0，马克思主义政治经济学入F0-0",
			}, {
				"marcverification": "",
				"fieldnum": "661",
				"designator": "0 ",
				"fieldcontent": "^a各代哲学史入有关各时代。例：《先秦哲学思想史》 入B22",
			}, {
				"marcverification": "",
				"fieldnum": "801",
				"designator": " 0",
				"fieldcontent": "^aCN^bNLC^c20170331",
			}];
		}
		if (type === "theme") {
			marcdata = [{
				"marcverification": "",
				"fieldnum": "001",
				"designator": "",
				"fieldcontent": "S055480",
			}, {
				"marcverification": "",
				"fieldnum": "005",
				"designator": "",
				"fieldcontent": "20170331103410.0",
			}, {
				"marcverification": "",
				"fieldnum": "024",
				"designator": "",
				"fieldcontent": "00000cw   2200000 a 45",
			}, {
				"marcverification": "",
				"fieldnum": "100",
				"designator": "",
				"fieldcontent": "^a20010701achiy50      ea",
			}, {
				"marcverification": "",
				"fieldnum": "250",
				"designator": "  ",
				"fieldcontent": "^a内蒙古",
			}, {
				"marcverification": "",
				"fieldnum": "250",
				"designator": "  ",
				"fieldcontent": "^7ba^anei meng gu",
			}, {
				"marcverification": "",
				"fieldnum": "330",
				"designator": "1 ",
				"fieldcontent": "^a",
			}, {
				"marcverification": "",
				"fieldnum": "450",
				"designator": "  ",
				"fieldcontent": "^8eng^aInner Mongolia",
			}, {
				"marcverification": "",
				"fieldnum": "450",
				"designator": "0 ",
				"fieldcontent": "^6a01^a历史唯物主义",
			},{
				"marcverification": "",
				"fieldnum": "450",
				"designator": "0 ",
				"fieldcontent": "^6a01^7ba^ali shi wei wu zhu yi",
			},{
				"marcverification": "",
				"fieldnum": "550",
				"designator": "  ",
				"fieldcontent": "^3^5^a",
			}, {
				"marcverification": "",
				"fieldnum": "801",
				"designator": " 0",
				"fieldcontent": "^aCN^bNLC^c20020701",
			}];
		}
		if(type!=="classify"&&type!=="theme"){
			marcdata = {
				error:0
			}
		}
		response.json(marcdata);
	});
	router.all('/addmarcdata', function(request, response, next) {
		var marcdata = [{
			"marcverification": "",
			"fieldnum": "001",
			"designator": "",
			"fieldcontent": "C055480",
		}, {
			"marcverification": "",
			"fieldnum": "005",
			"designator": "",
			"fieldcontent": "2017031092907.0",
		}, {
			"marcverification": "",
			"fieldnum": "024",
			"designator": "",
			"fieldcontent": "00000nw   2200000 a 45",
		}, {
			"marcverification": "",
			"fieldnum": "100",
			"designator": "",
			"fieldcontent": "^a20170417aaaa abbachiy0108      ea",
		}, {
			"marcverification": "",
			"fieldnum": "184",
			"designator": "0 ",
			"fieldcontent": "^aCLC^b中国图书馆分类法^c5^echi",
		}, {
			"marcverification": "",
			"fieldnum": "250",
			"designator": "0 ",
			"fieldcontent": "^d03^a^9B^h哲学",
		}, {
			"marcverification": "",
			"fieldnum": "330",
			"designator": "0 ",
			"fieldcontent": "^",
		}, {
			"marcverification": "",
			"fieldnum": "661",
			"designator": "0 ",
			"fieldcontent": "^",
		}, {
			"marcverification": "",
			"fieldnum": "801",
			"designator": " 0 ",
			"fieldcontent": "^aCN^bNLC^c20170331",
		}];
		response.json(marcdata);
	})



	var data = "";
	router.get('/getweatherhtml', function(request, response, next) {
		/*请求其它服务器数据渲染页面*/
		var http = require('http');
		http.get('http://192.168.6.30:8080/crowdfunding1/system/user/huTest.do?json=yanhao', (res) => {
			const {
				statusCode
			} = res;
			const contentType = res.headers['content-type'].split(";")[0];

			let error;
			if (statusCode !== 200) {
				error = new Error('请求失败。\n' +
					`状态码: ${statusCode}`);
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error('无效的 content-type.\n' +
					`期望 application/json 但获取的是 ${contentType}`);
			}
			if (error) {
				console.error(error.message);
				// 消耗响应数据以释放内存
				res.resume();
				return;
			}

			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk;

			});
			res.on('end', () => {
				try {

					data = rawData;
					const parsedData = JSON.parse(rawData);
					console.log(parsedData);
					response.json(parsedData);
				} catch (e) {
					console.error(e.message);
				}
			});
		}).on('error', (e) => {
			console.error(`错误: ${e.message}`);
		});
	});
}