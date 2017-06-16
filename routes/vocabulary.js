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

	/*module.exports = router;*/
}