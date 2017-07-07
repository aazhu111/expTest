/**
 * marc编辑
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/formatter', 'handlebars'], function($, common, xhr, formatter, Handlebars) {

	$(function() {
		/*变量命名空间*/
		var varnamespace = {
			count: 0,
			/*全局新增操作计数器*/
			type: common.url.GetQueryString("type"),
			editstate: common.url.GetQueryString("editstate"), //获取页面状态嘛（编辑/新增）
			addtr: { /*新增行数据*/
				"marcverification": "",
				"fieldnum": "",
				"designator": "",
				"fieldcontent": ""
			},

		};
		/*缓存字段号数目*/
		var cachefiedlnum = {

			}
			/*请求参数*/
		var multigroupoajax = {
				url: changeurl(varnamespace.editstate),
				type: "post",
				dataType: "json",
				data: {
					"type": varnamespace.type,
					"id": "",
					"databasecode": ""
				},
				success: function(data) {
					var template = Handlebars.compile($("#marcThemeTemplate").html());
					var renderHTML = template(data);
					$("#wrapper").html(renderHTML);
					if (varnamespace.type === "theme") {
						gatherFieldNumContent()
					}
					registerEvent();
					registerwathcer();
				}
			}
			/*页面初始化*/
		function init() {
			/*初始化请求获取页面数据*/
			xhr.callAjax(multigroupoajax);
		}
		/*根据页面状态，切换请求参数*/
		function changeurl(editstate) {
			return url = editstate === "true" ? WebApi_Edit + "/getmarcdata" : WebApi_Edit + "/addmarcdata"
		}

		/*
		 * 绑定模板数据,并做首屏渲染
		 * @param  {Object} data   主要用于表格增加行和数据填充
		 */
		function bindDataToTemplate($this, data) {
			varnamespace.count++;
			var template = Handlebars.compile($("#marcSingleLineAdd").html());
			var renderHTML = template(data);
			$this.parent().parent().after('<tr id="addtr' + varnamespace.count + '"></tr>');
			$('#addtr' + varnamespace.count).html(renderHTML);
		}
		/*增加行*/
		function addTr($this) {
			var obj = formatter.fmt.marcClassifyFormate(varnamespace.type, $this.val());
			var $tr = $this.parents("tr")
			$tr.find(".designator").val(obj.designator);
			$tr.find(".fieldcontent").val(obj.fieldcontent);
		}
		/*获取前缀字符串*/
		function getheaderstring(string) {
			return "^6a" + string.substring(0, 1) + (parseInt(string.substring(1, 2)) + 1);
		}
		/*收集2xx字段号和4xx字段最大序列号*/
		function gatherFieldNumContent() {
			var maxval;
			var noeng = false;
			$("tr").each(function(index, element) {
				var $this1 = $(this).children().eq(1).children();
				var $this1val = getspaninputval($this1);
				/*只有在marc是主题的时候才执行*/
				if (varnamespace.type === "theme") {
					if ($this1val === "200" || $this1val === "210" || $this1val === "215" || $this1val === "220" || $this1val === "230" || $this1val === "250") {
						cachefiedlnum["fieldnum"] = $this1val.substring(1, 3);
					}
					if ($this1val === "400" || $this1val === "410" || $this1val === "415" || $this1val === "420" || $this1val === "430" || $this1val === "450") {
						var $this3 = $(this).children().eq(3).children();
						var $this3val = getspaninputval($this3);
						if (!$this3val) { /*如果$this3是空串*/
							return;
						}
						/*判断是否有^8eng^a*/
						var eng = $this3val.substring(0, 7);
						if (eng === "^8eng^a") {
							noeng = true;
						}
						var t = $this3val.substring(3, 5)
						if (!parseFloat(t)) {
							return;
						}
						if (maxval) {
							if (maxval < t) {
								maxval = t;
							}
						} else {
							maxval = t;
						}
					}
				}
			});
			/*全局存储最大值4xx字段序号*/
			/*存储最大4xx序列号*/
			if (maxval) {
				cachefiedlnum["maxval"] = maxval;
			} else {
				cachefiedlnum["maxval"] = "00";
			}
			cachefiedlnum["noeng"] = noeng; /*是否有^8eng^a*/
			return cachefiedlnum;

		}
		/*填充span标签或input标签值*/
		function setspaninputval(ele, data) {
			ele.html(data);
			ele.val(data);
		}
		/*获取span标签或input标签值*/
		function getspaninputval(ele) {
			if (ele.html()) {
				return ele.html();
			}
			if (ele.val()) {
				return ele.val();
			}
		}
		//注册点击事件
		function registerEvent() {
			$("#wrapper").on("click", ".add", function() {
				var $this = $(this) /*保存目标ele*/
				bindDataToTemplate($this, varnamespace.addtr);
			})
			$("#wrapper").on("click", ".del", function() {
				$(this).parent().parent().remove();
				gatherFieldNumContent(); /*遍历一遍，获取最大值*/
			});
			$("#btngroup").click(function() {
				updatedata();
			})

		}
		function updatedata() {
			var content = [];
			var ajaxjson = {
				"id": "",
				"databasecode": "",
				"content": content
			}
			var elearr = $("#wrapper tbody").children();
			$.each(elearr, function(index,element) {
				content[index] = gatherdata($(this),true,index);
			})
			console.log(ajaxjson);

		}
		/*false表示进入递归，index是序号给后台传json时的序号*/
		function gatherdata(element, flag,index) {
			var contentobj = {
				"fieldid":"",
				"fieldcontent":"",
			};
			var contentstring = "";
			if (flag) {
				if(getspaninputval(element.children().eq(2).children())){
					var fieldnumdegintor = getspaninputval(element.children().eq(1).children()) +getspaninputval(element.children().eq(2).children()) +index;
				}else{
					var fieldnumdegintor = getspaninputval(element.children().eq(1).children()) +index;
				}
				
				contentobj.fieldid = fieldnumdegintor;
				
				if(element.children().eq(3).children().length>1){
					contentstring += gatherdata(element.children().eq(3),false)
				}else{
					contentstring += getspaninputval(element.children().eq(3).children())
				}
			}
			if(!flag){
				$(element.children()).each(function(index,element){
					contentstring += getspaninputval($(this));

				})
				 return contentstring;
			}
			contentobj.fieldcontent = contentstring;
			return contentobj;




		}
		/*事件观察者*/
		function registerwathcer() {
			$("#wrapper").on("keyup", ".designator", function() {
				var str = getspaninputval($(this));
				if (str && str.length > 1) {
					setspaninputval($(this), str.substring(0, 2));
				}
			})
			$("#wrapper").on("blur", ".fieldnum", function() {
				if (varnamespace.type === "theme") {
					if (cachefiedlnum.cache === "400" || cachefiedlnum.cache === "410" || cachefiedlnum.cache === "415" || cachefiedlnum.cache === "420" || cachefiedlnum.cache === "430" || cachefiedlnum.cache === "450") {
						cachefiedlnum.cache = "";
						gatherFieldNumContent(); /*遍历一遍，获取最大值*/
						return;
					}
				}
				var $this = $(this);
				addTr($this);
			});
			/*限制位数*/
			$("#wrapper").on("keyup", ".countfieldnum", function() {
					var str = getspaninputval($(this));
					if (str && str.length > 2) {
						setspaninputval($(this), str.substring(0, 3));
					}
				})
				/*如果是主题marc编辑，注册相应事件*/

			/*检测按下4，4是首字母，并且是主题marc编辑时 自动填充字段号字段内容*/
			$("#wrapper").on("keyup", ".fieldnum", function(ev) {
				var str = getspaninputval($(this));
				if (str && str.length > 2) {
					setspaninputval($(this), str.substring(0, 3));
				}
				/*主题的keyup事件4xx字段自动生成*/

				if (ev.key === "4" && varnamespace.type === "theme" && !($(this).html().length > 1 || $(this).val().length > 1)) {

					$(this).html(ev.key + cachefiedlnum.fieldnum);
					$(this).val(ev.key + cachefiedlnum.fieldnum);
					cachefiedlnum["cache"] = ev.key + cachefiedlnum.fieldnum; /*键入后，保存键入的值4xx字段*/
					if ($(this).parents("tr").children().eq(3).children().val()) {
						return;
					}
					var data = { /*建立新增数据*/

					}

					var $this = $(this).parents("tr").children().eq(3).children();
					var $this1 = $(this).parents("tr").children().eq(2).children();
					data.fieldnum = cachefiedlnum.cache; /*获取填充的4xx字段号*/
					cachedata = formatter.fmt.marcClassifyFormate(varnamespace.type, data.fieldnum)
					$.extend(data, cachedata); /*深拷贝数据*/
					if (cachefiedlnum.noeng === false) {

						/*$(this).parents("tr").children().eq(3).children().html(data.fieldcontent);
						$(this).parents("tr").children().eq(3).children().val(data.fieldcontent);*/
						setspaninputval($this, data.fieldcontent)
						setspaninputval($this1, data.designator);
						return;
					}
					/*$(this).parents("tr").children().eq(3).children().html(getheaderstring(cachefiedlnum.maxval) + "^a");
					$(this).parents("tr").children().eq(3).children().val(getheaderstring(cachefiedlnum.maxval) + "^a");*/
					setspaninputval($this, getheaderstring(cachefiedlnum.maxval) + "^a")
					setspaninputval($this1, data.designator);



					if (cachefiedlnum.noeng === true) {
						$.extend(data, varnamespace.addtr);
						data.fieldnum = cachefiedlnum.cache
						data.designator = formatter.fmt.marcClassifyFormate(varnamespace.type, data.fieldnum).designator
						data.fieldcontent = getheaderstring(cachefiedlnum.maxval) + "^7ba^a";
						bindDataToTemplate($this, data);
					}
				}
			});
			$("#wrapper").on("blur", ".fieldcontent", function() {
				gatherFieldNumContent();
			})
		}
		init(); /*程序入口*/
	});
});