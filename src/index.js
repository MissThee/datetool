const dateFormatKeyAndFunction = {
    'yyyy': (t) => t.getFullYear(),
    'yy': (t) => t.getFullYear().toString().substr(-2, 2),
    'MM': (t) => t.getMonth() + 1,
    'M': (t) => t.getMonth() + 1,
    'dd': (t) => t.getDate(),
    'd': (t) => t.getDate(),
    'HH': (t) => t.getHours(),
    'H': (t) => t.getHours(),
    'hh': (t) => t.getHours() % 12,
    'h': (t) => t.getHours() % 12,
    'mm': (t) => t.getMinutes(),
    'm': (t) => t.getMinutes(),
    'ss': (t) => t.getSeconds(),
    's': (t) => t.getSeconds(),
    'SSS': (t) => t.getMilliseconds().toString().padStart(3, '0').substr(0, 3),
    'SS': (t) => t.getMilliseconds().toString().padStart(3, '0').substr(0, 2),
    'S': (t) => t.getMilliseconds().toString().padStart(3, '0').substr(0, 1),
}

class DateHelper {

    constructor(date = new Date()) {
        if (!checkType(date, 'date')) {
            throw 'param error';
        }
        this._date = date;
    }

    setDate(date) {
        this._date = date;
        return this;
    }

    getDate() {
        return this._date;
    }

    dateToString(fmt) {
        return dateToString(this._date, fmt)
    }

    getFullDayInMonth() {
        return getFullDayInMonth(this._date.getFullYear(), this._date.getMonth())
    }

    isLeapYear() {
        return isLeapYear(this._date.getFullYear())
    }

    addMillisecond(value) {
        addMillisecond(this._date, value)
        return this;
    }

    addSecond(value) {
        addSecond(this._date, value)
        return this;
    }

    addMinute(value) {
        addMinute(this._date, value)
        return this;
    }

    addHour(value) {
        addHour(this._date, value)
        return this;
    }

    addDay(value) {
        addDay(this._date, value)
        return this;
    }

    addMonth(value, isKeepMonthEnd = false) {
        addMonth(this._date, value, isKeepMonthEnd)
        return this;
    }

    addYear(value, isKeepMonthEnd = false) {
        addYear(this._date, value, isKeepMonthEnd);
        return this;
    }

}

/**
 * dateToStringFactory
 * @param {String} fmt. If fmt isn't provided, the native Date.toString() function will be called
 * | Key   | Description                                       | Value         |
 * | :---- | :----                                             | :----         |
 * | yyyy  | The year                                          | `1999` `2001` |
 * | yy    | The year's last two-digit number                  | `99` `01`     |
 * | MM    | The month of the year with leading zero           | `01` - `12`   |
 * | M     | The month of the year between 1-12                | `1` - `12`    |
 * | dd    | The day of the month with leading zero            | `01` - `31`   |
 * | d     | The day of the month between 1 and 31             | `1`  - `31`   |
 * | HH    | The hour of the day with leading zero             | `00` - `23`   |
 * | H     | The hour of the day between 0-23                  | `0` - `23`    |
 * | hh    | The hour of the day with leading zero             | `01` - `12`   |
 * | h     | The hour of the day between 1-12                  | `1` - `12`    |
 * | mm    | The minute of the hour with leading zero          | `00` - `59`   |
 * | m     | The minute of the hour between 0-59               | `0` - `59`    |
 * | ss    | The seconds of the minute with leading zero       | `00` - `59`   |
 * | s     | The seconds of the minute between 0-59            | `0` - `59`    |
 * | SSS   | The milliseconds of the second between .000-.999  | `000` - `999` |
 * | SS    | The milliseconds of the second between .00-.99    | `00` - `99`   |
 * | S     | The milliseconds of the second between .0-.9      | `0` - `9`     |
 * @returns function(Date): String
 */
function dateToStringFactory(fmt) {
    return function (date) {
        if (!date || !checkType(date, 'date')) {
            throw 'unsupported date type';
        }
        if (!fmt || !checkType(fmt, 'string')) {
            return date.toString();
        } else {
            let dateFormatReplaceObj = {};
            for (let k in dateFormatKeyAndFunction) {
                if (dateFormatReplaceObj[k] === undefined) {
                    dateFormatReplaceObj[k] = dateFormatKeyAndFunction[k](date)
                }
                fmt = fmt.replace(new RegExp(k, 'g'), dateFormatReplaceObj[k].toString().padStart(k.length, '0'));
            }
            return fmt;
        }
    }
}

/**
 * format time
 * @param {String} fmt. If fmt isn't provided, the native Date.toString() function will be called
 * @param {Date} date
 * @returns {String}
 */
function dateToString(date, fmt) {
    return dateToStringFactory(fmt)(date);
}

/**
 * @param {Number} year
 * @param {Number} month. ( 0 ~ 11 )
 * @return {Number}
 */
function getFullDayInMonth(year, month) {
    if (month < 0 || month > 11 || !Number.isInteger(month)) {
        throw 'unknown month param' + month
    }
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function addMillisecond(date, value) {
    checkParam(date, value);
    date.setTime(date.getTime() + value);
    return date;
}

function addSecond(date, value) {
    checkParam(date, value);
    date.setTime(date.getTime() + value * 1000);
    return date;
}

function addMinute(date, value) {
    checkParam(date, value);
    date.setTime(date.getTime() + value * 1000 * 60);
    return date;
}

function addHour(date, value) {
    checkParam(date, value);
    date.setTime(date.getTime() + value * 1000 * 60 * 60);
    return date
}

function addDay(date, value) {
    checkParam(date, value);
    date.setTime(date.getTime() + value * 1000 * 60 * 60 * 24);
    return date
}

/**
 * addMonth
 * @param {Date} date
 * @param {Number} value
 * @param {Boolean} isKeepMonthEnd
 * @example
 * When isKeepMonthEnd is true, if the date passed in is the end of the month, it remains the end of the month after calculation
 * addMonth(new Date('2000/02/28'), -1, true); --> 2000/01/31
 * addMonth(new Date('2000/02/28'), -1);       --> 2000/01/28
 * @returns Date
 */
function addMonth(date, value, isKeepMonthEnd = false) {
    checkParam(date, value);
    let dayInMonth = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    date.setDate(1);

    let newMonth;
    let newYear;
    let newMonthTmpNum = date.getMonth() + 1 + value
    if (newMonthTmpNum > 12) {
        newYear = date.getFullYear() + Math.floor(newMonthTmpNum / 12);
        newMonthTmpNum = newMonthTmpNum % 12
    } else if (newMonthTmpNum < 1) {
        newYear = date.getFullYear() - 1 + Math.ceil(newMonthTmpNum / 12);
        newMonthTmpNum = newMonthTmpNum % 12 + 12
    } else {
        newYear = date.getFullYear();
    }
    newMonth = newMonthTmpNum - 1;
    let fullDayInMonth = getFullDayInMonth(year, month);
    let newFullDayInMonth = getFullDayInMonth(newYear, newMonth);
    date.setFullYear(newYear);
    date.setMonth(newMonth);
    let newDay = isKeepMonthEnd && fullDayInMonth === dayInMonth ? newFullDayInMonth : Math.min(dayInMonth, newFullDayInMonth);
    date.setDate(newDay);

    return date;
}

/**
 * addYear
 * @param {Date} date
 * @param {Number} value
 * @param {Boolean} isKeepMonthEnd
 * @example
 * When isKeepMonthEnd is true, if the date passed in is the end of the month, it remains the end of the month after calculation
 * addYear(new Date('2001/02/28'), -1, true); --> 2000/02/29
 * addYear(new Date('2001/02/28'), -1);       --> 2000/02/28
 * @returns Date
 */
function addYear(date, value, isKeepMonthEnd = false) {
    checkParam(date, value);
    return addMonth(date, value * 12, isKeepMonthEnd);
}

function checkType(obj, type) {
    if (Object.prototype.toString.call(type) !== '[object String]') {
        throw 'unsupported type param';
    }
    return Object.prototype.toString.call(obj) === '[object ' + type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase() + ']'
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
}

function checkParam(date, value) {
    if (!checkType(date, 'date') || !isValidDate(date)) {
        throw 'date must be valid Date';
    }
    if (!Number.isInteger(value)) {
        throw 'value must be Integer';
    }
}

module.exports = {
    DateHelper,
    dateToStringFactory,
    dateToString,
    getFullDayInMonth,
    isLeapYear,
    addMillisecond,
    addSecond,
    addMinute,
    addHour,
    addDay,
    addMonth,
    addYear,
}
