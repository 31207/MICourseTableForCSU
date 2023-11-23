async function scheduleTimer({
    providerRes,
    parserRes
  } = {}) 
  {
    var jcourses = JSON.parse(providerRes);
    var jstart = jcourses[jcourses.length-1];
    var starttime = Date.parse(jstart["starttime"]);
    console.log(jstart);
    return {
        totalWeek: jcourses.length-1, // 总周数：[1, 30]之间的整数
        startSemester: starttime.toString(), // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: true, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 2, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
          section: 1,
          startTime: '08:00', 
          endTime: '08:45'
        },{
            section: 2,
            startTime: '08:55', 
            endTime: '09:40'
          },{
            section: 3,
            startTime: '10:00', 
            endTime: '10:45'
          },{
            section: 4,
            startTime: '10:55', 
            endTime: '11:40'
          },{
            section: 5,
            startTime: '14:00', 
            endTime: '14:45'
          },{
            section: 6,
            startTime: '14:55', 
            endTime: '15:40'
          },{
            section: 7,
            startTime: '16:00', 
            endTime: '16:45'
          },{
            section: 8,
            startTime: '16:55', 
            endTime: '17:40'
          },{
            section: 9,
            startTime: '19:00', 
            endTime: '19:45'
          },{
            section: 10,
            startTime: '19:55', 
            endTime: '20:40'
          },
    ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
      }
  };