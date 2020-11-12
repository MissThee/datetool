const {DateHelper, dateToStringFactory, dateToString, getFullDayInMonth, isLeapYear, addMillisecond, addSecond, addMinute, addHour, addDay, addMonth, addYear} = require("../src/index.js");

function d(value) {
    return new Date(value);
}

function ds(value) {
    return new Date(value).toString();
}

this.test = {
    dateToString: (test) => {
        test.ok(dateToString(new Date('2020/01/01 20:01:02.234'), 'yyyy-MM-dd hh:mm:ss.SSS') === '2020-01-01 08:01:02.234', 1);
        test.ok(dateToString(new Date('2020/01/01 20:01:02.234'), 'yy-M-d h:m:s.SSS') === '20-1-1 8:1:2.234', 2);
        test.ok(dateToString(new Date('2020/01/01 20:01:02.234'), 'yyyyMMdd') === '20200101', 3);
        test.done();
    },
    addYear: (test) => {
        test.ok(addYear(d('2000/02/29'), 1).toString() === ds('2001/02/28'), '+1月');
        test.done();
    },
    addMonth: (test) => {
        // console.log(dateToString(addMonth(new Date('2020/02/28'), 13), 'yyyy-MM-dd hh:mm:ss.SSS'));
        test.ok(addMonth(d('2020/02/28'), 1).toString() === ds('2020/03/28'), '+1月');
        test.ok(addMonth(d('2020/02/28'), 6).toString() === ds('2020/08/28'), '+6月');
        test.ok(addMonth(d('2020/02/28'), 13).toString() === ds('2021/03/28'), '+13月');
        test.ok(addMonth(d('2020/02/28'), -1).toString() === ds('2020/01/28'), '-1月');
        test.ok(addMonth(d('2020/02/28'), -6).toString() === ds('2019/08/28'), '-6月');
        test.ok(addMonth(d('2020/02/28'), -13).toString() === ds('2019/01/28'), '-13月');
        test.done();
    },
    addMonthWithDayEdge: (test) => {
        // console.log(dateToString(addMonth(new Date('2000/01/31'), 1), 'yyyy-MM-dd hh:mm:ss.SSS'));
        test.ok(addMonth(d('2000/01/31'), 1).toString() === ds('2000/02/29'), '闰年2月+1月');
        test.ok(addMonth(d('2001/01/31'), 1).toString() === ds('2001/02/28'), '平年2月+1月');
        test.ok(addMonth(d('2000/01/31'), 3).toString() === ds('2000/04/30'), '1月+3月');
        test.ok(addMonth(d('2000/02/29'), 1, true).toString() === ds('2000/03/31'), '2月+1月 保持月末');
        test.ok(addMonth(d('2001/02/28'), -12, true).toString() === ds('2000/02/29'), '2月-12月 保持月末');
        test.ok(addMonth(d('2000/02/29'), 12).toString() === ds('2001/02/28'), '闰年2月+12月');
        test.done();
    },
    addDay: (test) => {
        // console.log(d('2000/02/28'))
        // console.log(addDay(d('2000/02/28'), 1))
        // console.log('输出', dateToString(
        //     addDay(d('2000/02/28'), 1)
        //     , 'yyyy-MM-dd hh:mm:ss.SSS'));
        test.ok(addDay(d('2000/02/28'), 1).toString() === ds('2000/02/29'), '+1天');
        test.ok(addDay(d('2000/02/29'), 1).toString() === ds('2000/03/01'), '+1天');
        test.done();
    },
    // readMe: (test) => {
    //     let date = new Date('2000-01-01');
    //     //NOTICE: All calculation operations will change the incoming Date object
    //     new DateHelper(date).addDay(1).addMonth(1).addYear(-1).getDate();
    //     addYear(date, 1);
    //     addMonth(date, 1);
    //     addDay(date, 1);
    //     addHour(date, 1);
    //     addMinute(date, 1);
    //     addSecond(date, 1);
    //     addMillisecond(date, 1);
    //     let isLeapYearResult = isLeapYear(2000);
    //     console.log(isLeapYearResult)
    //     let fullDayInMonth = getFullDayInMonth(2000, 1);
    //     console.log(fullDayInMonth)
    //     dateToString(date, 'yyyyMMdd');
    //     let dts = dateToStringFactory('yyyyMMdd');
    //     dts(date);
    //     dts(new Date());
    //     test.done();
    // }
};
