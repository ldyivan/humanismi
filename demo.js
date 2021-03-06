//格式化代码函数,已经用原生方式写好了不需要改动,直接引用就好
var formatJson = function(json, options) {
    var reg = null,
    formatted = '',
    pad = 0,
    PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true: false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false: true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    } (json.split('\r\n')).forEach(function(node, index) {
        var i = 0,
        indent = 0,
        padding = '';
        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }
        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
};

$.ajax({
    url: "http://www.hzv5.cn/humanismi/demo.json",
    //json文件位置，文件名
    type: "GET",
    //请求方式为get
    dataType: "json",
    //返回数据格式为json
    //jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
    success: function(data) { //请求成功完成后要执行的方法 
        //给info赋值给定义好的变量
        var pageData = data;
        //界面随机输出一条
        var nu = Math.floor(Math.random() * (0 - data.length) + data.length);
        //document.write(JSON.stringify(pageData[nu], null, "\t")); // 缩进一个tab
        var resultJson = formatJson(JSON.stringify(pageData[nu]));
        //(3)将格式化好后的json写入页面中
        document.getElementById("writePlace").innerHTML = '<pre>' + resultJson + '<pre/>';
		//document.write(resultJson);
        //{
        //  "id": 1405,
        //  "humanismi": "男人就应该保持冷静，沸腾的水只会被蒸发掉。",
        //  "type": "a",
        //  "from": "假面骑士kabuto",
        //  "creator": "魅影陌客",
        //  "created_at": "1319248277000"
        //}
		/*
        //输出console
        for (var i = 0; i < data.length; i++) {
            console.log(pageData[i].name);
        }
		*/
    }
})