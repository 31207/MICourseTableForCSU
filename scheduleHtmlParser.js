function scheduleHtmlParser(html)
{
    var res = [];
    var jcourses = JSON.parse(html);
    var indexMap = {"节次：0102节": [1,2], "节次：0304节": [3,4], "节次：0506节": [5,6], "节次：0708节": [7,8], "节次：0910节": [9,10]};
    for(var i = 0;i<jcourses.length-1;i++)
    {
        for(var j = 0;j<jcourses[i].length;j++)
        {
            var temp = {
                name: "数学", // 课程名称，从title中获取
                position: "教学楼1", // 上课地点，从title中获取
                teacher: "张三", // 教师名称，从title中获取
                weeks: [], // 周数
                day: 3, // 星期
                sections: [], // 节次
              };
            if(jcourses[i][j]["jx0404id"] == null)continue;
            console.log(jcourses[i][j]["title"]);
            /* 
            课程名称：大学英语
            上课教师：陈晓勤[副教授]
            周次：2-5,9-19(周)
            星期：星期五
            节次：0304节
            上课地点：外语网络楼229 
            
            */  //这是title分割之后的样子
            var strparts = new String(jcourses[i][j]["title"]).split("\n");
            temp["name"] = strparts[0].split("：")[1];
            temp["teacher"] = strparts[1].split("：")[1];
            temp["position"] = strparts[5].split("：")[1];
            temp["day"] = jcourses[i][j]["xq"]-1;
            temp["weeks"] = [i+1];
            temp["sections"] = indexMap[strparts[4]];
            res.push(temp);
        }
    }
    return res;
}