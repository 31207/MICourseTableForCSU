/* 
本函数用于获取原始课表信息
大致流程如下：
获取页面cookie——获取学期——获取学期周数——循环“周数”次，获取原始课表信息，构造json字符串，返回

*/

function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document)
{
    console.log("这是Provider部分");
    var strcookie = document.cookie;  //获取cookie，为下面的获取原始课表信息做准备
    console.log("获取的cookie：" + strcookie);
    var select_term = document.getElementById("xnxq01id");  
    //获取学期，格式为“起始学年-起始学年的下一年-1或2”
    //1代表上学期，2代表下学期，例如：2023-2024-1，代表2023学年的上学期（2023/9至2024/2）
    var select_week = document.getElementById("zc");
    var term = select_term.options[select_term.selectedIndex].value;
    const Http = new XMLHttpRequest();
    var url= "";
    var res = "[";
    for(var i = 0;i<select_week.options.length-1 ;i++)
    {
        url=`http://csujwc.its.csu.edu.cn/jsxsd/kbxx/getKbxx.do?xnxq01id=${term}&zc=${i+1}`;
        console.log(url);
        Http.open("POST", url, false);
        Http.send(strcookie);
        res += Http.responseText + ',';
        //console.log(res) 
    } 
    //最后获取学期开始第一天

    url=`http://csujwc.its.csu.edu.cn/jsxsd/kbxx/getRqmx.do?xnxq01id=${term}&zc=1`;
    Http.open("POST", url, false);
    Http.send(strcookie);
    var jtemp = JSON.parse(Http.responseText);
    var date = jtemp[1]["mxrq"];    //这是开学日期，定为开学第一周的星期一
    var year = "";
    var strparts = term.split("-");
    if(strparts[2] == "1")
    {
        year = strparts[0];
    }
    else if(strparts[2] == "2")
    {
        year = strparts[1];
    }

    date = year + "-" + date;

    res += `{"starttime":"00:00:00 ${date}"}]`;
    return res;
}

