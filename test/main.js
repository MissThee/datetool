import {dateToString, dateToStringFactory, addMonth, addYear, DateHelper as DH} from "../src/index.js";

let currentDate = new Date()
showStr('●Current Date: ', dateToString(currentDate, 'yyyy-MM-dd hh:mm:ss.SSS'));
let dateStr = '1999/01/01 20:01:02.456'
showStr('●format', dateStr);
showStr('12H', dateToString(new Date(dateStr), 'yyyy-MM-dd hh:mm:ss.SSS'));
showStr('24H', dateToString(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss.SSS'));
showStr('12H, no padding', dateToString(new Date(dateStr), 'yyyy-MM-dd h:m:s.SSS'));
showStr('year long short', dateToString(new Date(dateStr), 'yyyy-MM-dd yy-MM-dd'));
showStr('●static function');
showStr('current +1Month', dateToString(addMonth(currentDate, 1), 'yyyy-MM-dd hh:mm:ss.SSS'));
showStr('current -1Month', dateToString(addMonth(currentDate, -1), 'yyyy-MM-dd hh:mm:ss.SS'));
showStr('current -24Month', dateToString(addMonth(currentDate, -24), 'yyyy-MM-dd hh:mm:ss.S'));
showStr('current -14Year', dateToString(addYear(currentDate, -14), 'yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2000-02-29 +2Year', dateToString(addYear(new Date('2000-02-29 00:00:00'), 2), 'yyyy-MM-dd hh:mm:ss.SSS'));
showStr('●instance');
showStr('current +3Day', new DH(new Date()).addDay(3).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('●keep month end');
showStr('2001/02/28 -1Year',dateToString(addYear(new Date('2001/02/28'), -1, true),'yyyy-MM-dd'))
showStr('2001/1/31 +1Month', new DH(new Date('2001/1/31')).addMonth(1).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2001/2/28 +1Month', new DH(new Date('2001/2/28')).addMonth(1, true).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2000/2/29 +1Month', new DH(new Date('2000/2/29')).addMonth(1, true).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2000/2/29 -1Month', new DH(new Date('2000/2/29')).addMonth(-1, true).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('●don\'t keep month end');
showStr('2001/2/28 +1Month', new DH(new Date('2001/2/28')).addMonth(1).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2000/2/29 +1Month', new DH(new Date('2000/2/29')).addMonth(1).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('●month change');
showStr('2001/1/31 +1Month', new DH(new Date('2001/1/31')).addMonth(1).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2000/1/31 +1Month', new DH(new Date('2000/1/31')).addMonth(1).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));
showStr('2000/1/31 +3Month', new DH(new Date('2000/1/31')).addMonth(3).dateToString('yyyy-MM-dd hh:mm:ss.SSS'));

showStr('●thunkify');
let dtf = dateToStringFactory('yyyy-MM-dd')
showStr(dtf(new Date));
showStr('●early date test');
showStr(dateToString(new Date(1), 'yyyy-MM-dd hh:m:s.SSS'));
showStr(dateToString(new Date(12), 'yyyy-MM-dd hh:m:s.SSS'));
showStr(dateToString(new Date(123), 'yyyy-MM-dd hh:m:s.SSS'));
showStr(dateToString(new Date(1234), 'yyyy-MM-dd hh:m:s.SSS'));

function showStr(...str) {
    let div = document.createElement("div");
    for (let value of str) {
        let span = document.createElement('span');
        span.style.display = 'inline-block'
        span.style.width = '220px'
        span.style.borderBottom = '1px solid #ddd'
        span.innerText = value;
        div.appendChild(span);
    }
    document.body.appendChild(div);
}