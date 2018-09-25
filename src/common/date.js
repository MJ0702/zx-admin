//时间过滤器方法
export function formatDate(date, fmt) {
    let dateTime = new Date(date);
    var o = {
        "M+": dateTime.getMonth() + 1,               //月份   
        "d+": dateTime.getDate(),                    //日   
        "h+": dateTime.getHours(),                   //小时   
        "m+": dateTime.getMinutes(),                 //分   
        "s+": dateTime.getSeconds(),                 //秒   
        "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度   
        "S": dateTime.getMilliseconds()             //毫秒   
    };
 
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};