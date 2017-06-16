/**
 * 辅导资料
 * @param  {[type]} $           [description]
 * @param  {[type]} ko          [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['common', 'utils/xhr', 'utils/copyutil','jquery' ], function( common, xhr, ClipBoard,$) {

    $(function() {
        var cachedom = "";
        var count = 0;
        var floatdiv = document.getElementById("theme0");
        var hreflink1 = $(".newOpen")[0]
        var leftDistance, topDistance;
        var $floatdiv = $("#floatbox");
        var $floatboxheader = $("#floatboxheader");
        var $theme1 = $("#theme1");
        var $theme2 = $("#theme2");
        var flag = false;
        //box.innerHTML = "<p id='copy-p' style='text-align:center;font-size:28px;'>内蒙古</p>"
        function clickDom1(domEle) {
            var a1 = navigator.userAgent;
            var yesIE = a1.search(/Trident/i);
            if (domEle.addEventListener) {
                domEle.addEventListener("click", function(ev) {
                    if (yesIE > 0) {

                        /*var newwindow = window.open("html/blank.html",'','width='+(window.screen.availWidth/2)+',height='+(window.screen.availHeight/2),'location=yes,menubar=yes,status=yes,resizable=yes,modal=yes');*/
                        /*window.open("html/middleweb1/index.html",'',"newWindow","height=650,width=1000,scrollbars=yes,status=yes,toolbar=no,menubar=no,location=no")*/
                    } else {
                        window.open("middleweb1/index.html", '', 'width=' + (window.screen.availWidth / 2) + ',height=' + (window.screen.availHeight / 2), 'location=yes,menubar=yes,status=yes,resizable=yes,modal=yes')
                        ev.preventDefault();
                        return false;
                    }
                })
            } else {
                domEle.attachEvent("onclick", function(ev) {
                    window.open("middleweb1/index.html", '', 'widht=500,height=500,location=yes,menubar=yes,scrollbars=1,status=yes,toolbar=yes,resizable=yes')
                    return false;
                })
            }
        }

        function clickDom(domEle,id,selector,ev) {

               $(".floatboxright_ul").show();
               $(selector).show();
                    $(selector).offset({
                        "left": (ev.clientX +10),
                        "top": ev.clientY
                    })
                    $(".cancel").unbind("click").bind("click",function(){
                        $(this).parents(selector).css({"display":"none"});
                    })
            if (domEle.addEventListener) {
                    if (cachedom) {
                        cachedom.off("success").off("error");
                        cachedom = null;
                    }
                    c1 = null;
                    var c1 = new ClipBoard({
                        handlerID: 'copy-btn',
                        textID: domEle.getAttribute("id"),
                        isAttr: false,
                        type: 'copy'
                    });
                    cachedom = c1.attach(undefined, $(".floatboxright_ul"));
                   
            } else {    
                    count = 0;
                    if (cachedom) { //释放多余空间
                        cachedom.detachEvent("onclick");
                        cachedom = null;
                        CollectGarbage();
                    }
                    var c1 = new ClipBoard({
                        handlerID: 'copy-btn',
                        textID: domEle.getAttribute("data-copyid"),
                        isAttr: false,
                        type: 'copy'
                    });
                    cachedom = c1.attach(cachedom, $(".floatboxright_ul"));
            }
             return false;

        }
       
        /*clickDom(floatdiv)
        clickDom($theme1[0], "#theme1")
        clickDom($theme2[0], "#theme2")
        clickDom1(hreflink1);*/

        //树插件
        function infinityTree() {
            var json = "";
            var ajax = {
                url: "http://192.168.6.79:3000/vocabulary",
                type: "get",

                success: function(data) {
                    json = data;
                    updateZtree(json) ;
                }
            }
            xhr.callAjax(ajax);
            /*递归实现获取无级树数据并生成DOM结构*/

            var str = "";
            var forTree = function(o) {
                    for (var i = 0; i < o.length; i++) {
                        var urlstr = "";
                        try {
                            if (typeof o[i]["url"] == "undefined") {
                                urlstr = "<div><span id= id" + o[i]["pid"] + "><a href = "+o[i]["url"]+">" + o[i]["name"] + "</a></span><ul>";
                            } else {
                                urlstr = "<div><span id= id" + o[i]["pid"] +"><a href=" + o[i]["url"] + ">" + o[i]["name"] + "</a></span><ul>";
                            }
                            str += urlstr;
                            if (o[i]["list"] != null) {
                                forTree(o[i]["list"]);
                            }
                            str += "</ul></div>";
                        } catch (e) {}
                    }
                    return str;
                }
                /*添加无级树*/
            function updateZtree(json) {
                document.getElementById("menuTree").innerHTML = forTree(json);
                /*树形菜单*/
                var menuTree = function() {
                    //<i class='menuTreetoggle'>[-]</i>
                        //给有子对象的元素加[+-]
                        $("#menuTree ul").each(function(index, element) {
                            var ulContent = $(element).html();
                            var spanContent = $(element).siblings("span").html();
                            if (ulContent) {
                                $(element).siblings("span").html("<i class='menuTreetoggle'>[+]</i> " + spanContent)
                            }
                        });
                        $("#menuTree").find("div i").click(function(ev) {
                            var ul = $(this).parent().siblings("ul");
                            var spanStr = $(this).parent().html();
                            var spanContent = spanStr.substr(34, spanStr.length);
                            if (ul.find("div").html() != null) {
                                if (ul.css("display") == "none") {
                                    ul.show(300);
                                    $(this).html("[-] ");
                                } else {
                                    ul.hide(300);
                                     $(this).html("[+] ");
                                }
                            }
                            ev.stopPropagation();
                        })
                    }()
                    /*展开*/
                $("#btn_open").click(function() {
                        $("#menuTree ul").show(300);
                        curzt("-");
                    })
                    /*收缩*/
                $("#btn_close").click(function() {
                    $("#menuTree ul").hide(300);
                    curzt("+");
                })
                //注册树代理菜单事件
                 $(document).on("click","#menuTree a",function(ev){
                    clickDom($(this)[0], $(this).parent().attr("id"),"#floatboxright",ev);
                    ev.stopPropagation();
                    return false;

                 })

               
                //定位沈阳
                $("#locateshenyang").unbind("click").bind("click", function() {
                    var pid = $(this).attr("data-id");
                    locateTreeNode(pid);
                })

            }


            function curzt(v) {
                $("#menuTree span").each(function(index, element) {
                    var ul = $(this).siblings("ul");
                    var spanStr = $(this).html();
                    var spanContent = spanStr.substr(3, spanStr.length);
                    if (ul.find("div").html() != null) {
                        $(this).html("[" + v + "] " + spanContent);
                    }
                });
            }
        }

        function locateTreeNode(pid) {
            $("#" + pid).parents("ul").css({
                "display": "block"
            });
            $("#" + pid).next().find("ul").css({
                "display": "none"
            });
            $("#" + pid).next().css({
                "display": "none"
            });
        }
         infinityTree();

    })
});