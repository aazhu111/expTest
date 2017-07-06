/**
 * 格式化模块
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
define(function() {

    //#region 资源定义
    //格式化
    var fmt = fmt || {};
    //翻译
    var trans = trans || {};
    //#endregion 资源定义
    // #region 方法

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.format = function(mask) {
        var d = this;
        var zeroize = function(value, length) {
            if (!length) length = 2;
            value = String(value);
            for (var i = 0, zeros = ''; i < (length - value.length); i++) {
                zeros += '0';
            }
            return zeros + value;
        };

        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
            switch ($0) {
                case 'd':
                    return d.getDate();
                case 'dd':
                    return zeroize(d.getDate());
                case 'ddd':
                    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
                case 'dddd':
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
                case 'M':
                    return d.getMonth() + 1;
                case 'MM':
                    return zeroize(d.getMonth() + 1);
                case 'MMM':
                    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
                case 'MMMM':
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
                case 'yy':
                    return String(d.getFullYear()).substr(2);
                case 'yyyy':
                    return d.getFullYear();
                case 'h':
                    return d.getHours() % 12 || 12;
                case 'hh':
                    return zeroize(d.getHours() % 12 || 12);
                case 'H':
                    return d.getHours();
                case 'HH':
                    return zeroize(d.getHours());
                case 'm':
                    return d.getMinutes();
                case 'mm':
                    return zeroize(d.getMinutes());
                case 's':
                    return d.getSeconds();
                case 'ss':
                    return zeroize(d.getSeconds());
                case 'l':
                    return zeroize(d.getMilliseconds(), 3);
                case 'L':
                    var m = d.getMilliseconds();
                    if (m > 99) m = Math.round(m / 10);
                    return zeroize(m);
                case 'tt':
                    return d.getHours() < 12 ? 'am' : 'pm';
                case 'TT':
                    return d.getHours() < 12 ? 'AM' : 'PM';
                case 'Z':
                    return d.toUTCString().match(/[A-Z]+$/);
                    // Return quoted strings with the surrounding quotes removed
                default:
                    return $0.substr(1, $0.length - 2);
            }
        });

    };

    /**
     * 日期格式化
     * @param  {[type]} value [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    fmt.dateformat = function(value, data) {
        if (value != undefined) {
            value = value.replace(/-/g, "/");
            if (value)
                return (new Date(value)).format("yyyy-MM-dd");
        } else {
            return '';
        }
    };

    /**
     * 日期时间格式化
     * @param  {[type]} value [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    fmt.datetimeformat = function(value, data) {
        if (value != undefined) {
            value = value.replace(/-/g, "/");
            if (value)
                return (new Date(value)).format("yyyy-MM-dd HH:mm:ss");
        } else {
            return '';
        }
    };

    /**
     * 中文日期格式化
     * @param  {[type]} value [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    fmt.dateformatChinese = function(value, data) {
        if (value != undefined) {
            if (value.toString().indexOf("T") < 0) { //如果数据库中是date类型，则浏览器中会多加个'T',如果包含T就不进行转换
                value = value.replace(/-/g, "/");
            }
            if (value)
                return (new Date(value)).format("yyyy年MM月dd日");
        } else {
            return '';
        }
    };

    /**
     * 将int类型状态改为string
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    trans.getStatueByInt = function(n) {
        switch (n) {
            case 1:
                return "启用";
            case 2:
                return "停用";
        }
    }


    /**
     * 将string类型状态改为int
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    trans.getStatueByString = function(n) {
        switch (n) {
            case "启用":
                return 1;
            case "停用":
                return 2;
        }
    }


    /**
     * 数字转字母
     * @param {[type]} n [description]
     */
    trans.tranLetter = function(n) {
        switch (n) {
            case "0":
                return "A";
                break;
            case "1":
                return "B";
                break;
            case "2":
                return "C";
                break;
            case "3":
                return "D";
                break;
            case "4":
                return "E";
                break;
            case "5":
                return "F";
                break;
            case "6":
                return "G";
                break;
            case "7":
                return "H";
                break;
            case "8":
                return "I";
                break;
            case "9":
                return "J";
                break;
            case "10":
                return "K";
                break;
        }
    };

    /**
     * 字母转数字
     * @param {[type]} n [description]
     */
    trans.tranNum = function(letter) {
        if (letter == "A" || letter == "B" || letter == "C" || letter == "D" || letter == "E" || letter == "F" || letter == "G" || letter == "H" || letter == "I" || letter == "J" || letter == "K") {
            switch (letter) {
                case "A":
                    return "0";
                    break;
                case "B":
                    return "1";
                    break;
                case "C":
                    return "2";
                    break;
                case "D":
                    return "3";
                    break;
                case "E":
                    return "4";
                    break;
                case "F":
                    return "5";
                    break;
                case "G":
                    return "6";
                    break;
                case "H":
                    return "7";
                    break;
                case "I":
                    return "8";
                    break;
                case "J":
                    return "9";
                    break;
                case "K":
                    return "10";
                    break;
            }
        } else {
            return letter;
        }
    };

    /**
     * 小数判断
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    trans.judgetDecimal = function(n) {
        var index = n.indexOf('.'); //小数点所在位置
        var decimal = n.slice(index + 1); //小数点后的数字
        if (decimal > 0) {
            return n;
        } else if (decimal == 0 && index > 0) {
            var num = n.replace(n.slice(index), '');
            return num;
        } else {
            return n;
        }
    }

    /**
     * json字符串转换成json
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    trans.stringToJson = function(n) {
        if (typeof(n) !== 'object') {
            for (i = 0; i < 3; i++) {
                if (typeof(n) !== 'object') {
                    if (n.charAt(i) == '"') {
                        n = JSON.parse(n);
                    }
                }
            }
        }
        return n;
    }

    // #endregion 方法

    /**
     * marc字段号生成相应的指示符和字段内容
     * @param  {[type]} type marc类型？theme：classify
     * @param  {[type]} fieldnum 字段号
     * @param  {[type]} meetingflag ？团队会议：个人会议
     * @return {Object} obj}   返回一个json对象
     */
    fmt.marcClassifyFormate = function(type, fieldnum, meetingflag) {
        var obj;
        if (type === "classify") {
            switch (fieldnum) {
                case "001":
                    {
                        obj = {
                            designator: "",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "003":
                    {
                        obj = {
                            designator: "",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "035":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "100":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "250":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "254":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "330":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "343":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "353":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "453":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "553":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "661":
                    {
                        obj = {
                            designator: " 0",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "662":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "663":
                    {
                        obj = {
                            designator: "10",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "665":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "668":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "669":
                    {
                        obj = {
                            designator: " 0",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "700":
                    {
                        obj = {
                            designator: " 0",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "710":
                    { /*如果710是团队会议否则*/
                        var obj = meetingflag ? {
                            designator: "02",
                            fieldcontent: ""
                        } : {
                            designator: "12",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "720":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "730":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "750":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "751":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "753":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "754":
                    {
                        obj = {
                            designator: "",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "801":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "804":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "820":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "825":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "830":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "856":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "875":
                    {
                        obj = {
                            designator: "28",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "876":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                default:
                    {
                        obj = false;alert("输入的字段号不存在")
                    };
            }
        }
        if (type === "theme") {
            switch (fieldnum) {
                case "001":
                    {
                        obj = {
                            designator: "",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "005":
                    {
                        obj = {
                            designator: "",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "100":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "200":
                    {
                        obj = {
                            designator: "0 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "210":
                    {
                        /*如果210是团队会议否则*/
                        var obj = meetingflag ? {
                            designator: "02",
                            fieldcontent: ""
                        } : {
                            designator: "12",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "215":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "220":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "230":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "250":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "300":
                    {
                        obj = {
                            designator: "1 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "305":
                    {
                        obj = {
                            designator: "1 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "310":
                    {
                        obj = {
                            designator: "1 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "320":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "330":
                    {
                        obj = {
                            designator: "1 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "400":
                    {
                        obj = {
                            designator: " 0",
                            fieldcontent: "^8eng^a"
                        }
                    };
                    break;
                case "410":
                    {
                        /*如果410是团队会议否则*/
                        var obj = meetingflag ? {
                            designator: "02",
                            fieldcontent: "^8eng^a"
                        } : {
                            designator: "12",
                            fieldcontent: "^8eng^a"
                        }
                    };
                    break;
                case "415":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: "^8eng^a"
                        }
                    };
                    break;
                case "420":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: "^8eng^a"
                        }
                    };
                    break;
                case "430":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: "^8eng^a"
                        }
                    };
                    break;
                case "450":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: "^8eng^a"
                        }
                    };
                    break;
                case "500":
                    {
                        obj = {
                            designator: " 0",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "510":
                    {
                        /*如果410是团队会议否则*/
                        var obj = meetingflag ? {
                            designator: "02",
                            fieldcontent: ""
                        } : {
                            designator: "12",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "515":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "520":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "530":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "550":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "690":
                    {
                        obj = {
                            designator: "1 ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "801":
                    {
                        obj = {
                            designator: " 0",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "810":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "815":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "820":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "825":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "830":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                case "835":
                    {
                        obj = {
                            designator: "  ",
                            fieldcontent: ""
                        }
                    };
                    break;
                default:
                    {
                        obj = false;alert("输入的字段号不存在")
                    };
            }
        }


        return obj;
    }

    // #endregion 方法

    return {
        fmt: fmt,
        trans: trans
    }

});