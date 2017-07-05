define(['jquery', 'handlebars'], function($, Handlebars) {
    var Root_File = '/static/Web_Edit/';
    /*分类表状态命名空间*/
    var tablenamespace = true;
    //url参数
    var _url = _url || {};

    _url.GetQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }


    //格式校验
    Handlebars.registerHelper("marcverification", function(data, index, option) {
        return '<span>' + data + '</span>'
    });
    //字段号
    Handlebars.registerHelper("fieldnum", function(data, index, flag, option) {
        var type = _url.GetQueryString("type"); /*模板类型*/
        var fieldnumstring = "";
        /*分类款目marc编辑*/
        if (type === "classify") {
            if (index < 6) {
                fieldnumstring = '<span class="width30 borderl2t tlleft displayib">' + data + '</span>'
            } else {
                fieldnumstring = flag ?
                    '<input type="text" class="width30 fieldnum" value="' + data + '">' :
                    '<input type="text" class="width30 " value="' + data + '">'
            }
        }
        /*主题款目marc编辑*/
        if (type === "theme") {
            if (index < 4) {
                fieldnumstring = '<span class="width30 borderl2t tlleft displayib countfieldnum">' + data + '</span>'
            } else {
                fieldnumstring = flag ?
                    '<input type="text" class="width30 fieldnum countfieldnum" value="' + data + '">' :
                    '<input type="text" class="width30 countfieldnum" value="' + data + '">'
            }
        }

        return fieldnumstring;
    });
    //指示符
    Handlebars.registerHelper("designator", function(data, num, index, flag, option) {
        var type = _url.GetQueryString("type"); /*模板类型*/
        var designatorstring = "";
        /*分类款目marc编辑*/
        if (type === "classify") {
            if (index < 4) {
                designatorstring = '<span class="width30 borderl2t tlleft displayib">' + data + '</span>'
            } else {
                designatorstring = flag ?
                    '<input type="text" class="width30 designator" value="' + data + '">' :
                    '<input type="text" class="width30" value="' + data + '">'
            }
        }
        /*主题款目marc编辑*/
        if (type === "theme") {
            if (index < 4) {
                designatorstring = '<span class="width30 borderl2t tlleft displayib">' + data + '</span>'
            } else {
                designatorstring = flag ?
                    '<input type="text" class="width30 designator" value="' + data + '">' :
                    '<input type="text" class="width30" value="' + data + '">'
            }
        }

        return designatorstring;
    });
    //字段内容
    Handlebars.registerHelper("fieldcontent", function(data, num, flag, option) {
        var type = _url.GetQueryString("type"); /*模板类型*/
        var fieldcontent = "";
        /*分类款目marc编辑*/
        if (type === "classify") {
            switch (num) {
                case "001":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                case "005":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                case "024":
                    {
                        fieldcontent = '<span>' + data.substring(0, 5) + '</span>' + '<a href="###" class="black">' + data.substring(5, 6) + '</a>' + '<span>' + data.substring(6, data.length) + '</span>'
                    };
                    break;
                case "100":
                    {
                        fieldcontent =
                        '<span>' + data.substring(0, 11) + '</span>' +
                        '<a href="###" class="red">' + data.substring(11, 14) + '</a>' +
                        '<span>' + data.substring(14, 16) + '</span>' +
                        '<a href="###" class="red">' + data.substring(16, 17) + '</a>' +
                        '<span>' + data.substring(17, data.length) + '</span>'
                    };
                    break;
                case "184":
                    {
                        fieldcontent = '<span>' + data + '</span>';
                    };
                    break;
                case "250":
                    {
                        /*250规则是变化的以^分割*/
                        var dataarr = data.split("^");
                        var datastring = ""
                        for (var i = 3; i < dataarr.length - 1; i++) {
                            datastring += "^" + dataarr[i]
                        }
                        /*填充数据并用flex实现适应性百分比*/
                        fieldcontent =
                        '<div style="display:flex">' +
                        '<div class="marccontent" style="display:inline-block;">' +
                        '<span>^' + dataarr[1] + '</span>' +
                        '<input type="text" value="^' + dataarr[2] + '">' +
                        '<span>' + datastring + '</span>' +
                        '</div>' +
                        '<div style="flex-grow:1;">' +
                        '<input  type="text" class="width100% " value="^' + dataarr[dataarr.length - 1] + '">' +
                        '</div>'
                        '<div>'


                    };
                    break;
                case "330":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "661":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "801":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                default:
                    {
                        fieldcontent = flag ?
                        '<input type="text" class="fieldcontent" style="width:100%;" value="' + data + '">' : '<input type="text" style="width:100%; " value="' + data + '">'
                    };
            }
        }
        /*主题款目marc编辑*/
        if (type === "theme") {
            switch (num) {
                case "001":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                case "005":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                case "024":
                    {
                        fieldcontent = '<span>' + data.substring(0, 5) + '</span>' + '<a href="###" class="black">' + data.substring(5, 6) + '</a>' + '<span>' + data.substring(6, data.length) + '</span>'
                    };
                    break;
                case "100":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                case "200":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "210":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "215":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "220":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "230":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "250":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "330":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "400":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "410":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "415":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "420":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "430":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "450":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "690":
                    {
                        fieldcontent = '<input type="text" class="width100% " value="' + data + '">';
                    };
                    break;
                case "801":
                    {
                        fieldcontent = '<span>' + data + '</span>'
                    };
                    break;
                default:
                    {
                        fieldcontent = flag ?
                        '<input type="text" class="fieldcontent" style="width:100%;" value="' + data + '">' : '<input type="text" style="width:100%; " value="' + data + '">'
                    };
            }
        }

        return fieldcontent;

    });

    //操作符
    Handlebars.registerHelper("marcoperatebtn", function(index, flag) {
        var type = _url.GetQueryString("type"); /*模板类型*/
        /*分类款目marc编辑*/
        if (type === "classify") {
            if (index === 4) {
                var button =
                    '<a title="新增" class="iconfont icon-open-plus add"></a>';
            }
            if (index > 4 || flag) {
                var button =
                    '<a title="新增" class="iconfont icon-open-plus add"></a>' +
                    '<span title="删除" class="iconfont icon-open-delete offset-lg-1 del"></span>';
            }
        }
        /*主题款目marc编辑*/
        if (type === "theme") {
            if (index === 3) {
                var button =
                    '<a title="新增" class="iconfont icon-open-plus add"></a>';
            }
            if (index > 3 || flag) {
                var button =
                    '<a title="新增" class="iconfont icon-open-plus add"></a>' +
                    '<span title="删除" class="iconfont icon-open-delete offset-lg-1 del"></span>';
            }
        }

        return button;
    });


    return {
        url: _url
    }
})