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
 * @param fmt String. If fmt isn't provided, the native Date.toString() function will be called
 * @returns function(Date): String
 */
function dateToStringFactory(fmt) {
    return function (date) {
        if (!date || !checkType(date, 'date')) {
            throw 'unsupported date type';
        }
        if (!fmt || !checkType(fmt, 'String')) {
            return date.toString();
        } else {
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            let millisecond = date.getMilliseconds();
            let millisecondStr = millisecond.toString().padStart(3, '0');
            const dateFormatObj = {
                'yyyy': year,
                'yy': year.toString().substring(year.toString().length - 2),
                'M+': month + 1,
                'd+': day,
                'H+': hour,
                'h+': hour % 12,
                'm+': minute,
                's+': second,
                'SSS': millisecondStr.substr(0, 3),
                'SS': millisecondStr.substr(0, 2),
                'S': millisecondStr.substr(0, 1),
            }
            let ret;
            for (let k in dateFormatObj) {
                while (ret = new RegExp('(' + k + ')').exec(fmt)) {
                    fmt = fmt.replace(new RegExp(ret[1], 'g'), (ret[1].length === 1) ? dateFormatObj[k] : dateFormatObj[k].toString().padStart(ret[1].length, '0'));
                }
            }
            return fmt;
        }
    }
}

/**
 * format time
 * @param fmt String. If fmt isn't provided, the native Date.toString() function will be called
 * @param date Date
 * @returns String
 */
function dateToString(date, fmt) {
    return dateToStringFactory(fmt)(date);
}

function getFullDayInMonth(year, month) {
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
 * @param date Date
 * @param value Integer
 * @param isKeepMonthEnd Boolean
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
 * @param date Date
 * @param value Integer
 * @param isKeepMonthEnd Boolean
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

function checkParam(date, value) {
    if (!checkType(date, 'date')) {
        throw 'date must be Date';
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