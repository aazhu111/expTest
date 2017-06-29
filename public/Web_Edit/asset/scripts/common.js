define(['jquery', 'handlebars'], function($, Handlebars) {
    var Root_File = '/static/Web_Edit/';
    /*分类表状态命名空间*/
    var tablenamespace = true;


    //格式校验
    Handlebars.registerHelper("marcverification", function(data, index, option) {
        return '<span>' + data + '</span>'
    });
    //字段号
    Handlebars.registerHelper("fieldnum", function(data, index, option) {
        if (index < 6) {
            return '<span class="width30 borderl2t tlleft displayib">' + data + '</span>'
        } else {
            return '<input type="text" class="width30" value="' + data + '">'
        }
    });
    //指示符
    Handlebars.registerHelper("designator", function(data, num, index, option) {
        if (index < 5) {
            return '<span class="width30 borderl2t tlleft displayib">' + data + '</span>'
        } else {
            return '<input type="text" class="width30" value="' + data + '">'
        }
    });
    //字段内容
    Handlebars.registerHelper("fieldcontent", function(data, num, option) {
        var fieldcontent = "";
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
                    for(var i = 3;i<dataarr.length-1;i++){
                        datastring += "^"+dataarr[i]
                    }
                    /*填充数据并用flex实现适应性百分比*/
                    fieldcontent =
                    '<div style="display:flex">' +
                    '<div class="marccontent" style="display:inline-block;">' +
                    '<span>^' + dataarr[1] + '</span>' +
                    '<input type="text" value="^'+dataarr[2]+'">' + 
                    '<span>' + datastring + '</span>' +
                    '</div>' +
                    '<div style="flex-grow:1;">' +
                    '<input  type="text" class="width100%" value="^'+dataarr[dataarr.length-1]+'">' +
                    '</div>'
                    '<div>'
                    

                };
                break;
            case "330":
                {
                    fieldcontent = '<input type="text" class="width100%" value="' + data + '">';
                };
                break;
            case "661":
                {
                    fieldcontent = '<input type="text" class="width100%" value="' + data + '">';
                };
                break;
            case "801":
                {
                    fieldcontent = '<span>' + data + '</span>'
                };
                break;
            default:
                {
                    fieldcontent = '<input type="text" style="width:100%;" value="' + data + '">'
                };
        }
        return fieldcontent;

    });

    //操作符
    Handlebars.registerHelper("marcoperatebtn", function(index) {
        if (index === 4) {
            var button =
                '<a title="新增" class="iconfont icon-open-plus add"></a>';
        }
        if (index > 4) {
            var button =
                '<a title="新增" class="iconfont icon-open-plus add"></a>' +
                '<span title="删除" class="iconfont icon-open-delete offset-lg-1 del"></span>';
        }
        return button;
    });
})