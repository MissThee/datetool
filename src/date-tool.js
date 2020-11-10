export class DateHelper {
    #date;

    constructor(date) {
        if (!checkType(date, 'date')) {
            throw 'param error';
        }
        this.#date = date;
    }

    setDate(date) {
        this.#date = date;
        return this;
    }

    dateToString(fmt) {
        return dateToString(this.#date, fmt)
    }

    getFullDayInMonth() {
        return getFullDayInMonth(this.#date.getFullYear(), this.#date.getMonth())
    }

    isLeapYear() {
        return isLeapYear(this.#date.getFullYear())
    }

    addMillisecond(value) {
        addMillisecond(this.#date, value)
        return this;
    }

    addSecond(value) {
        addSecond(this.#date, value)
        return this;
    }

    addMinute(value) {
        addMinute(this.#date, value)
        return this;
    }

    addHour(value) {
        addHour(this.#date, value)
        return this;
    }

    addDay(value) {
        addDay(this.#date, value)
        return this;
    }

    addMonth(value, isKeepMonthEnd = false) {
        addMonth(this.#date, value)
        return this;
    }

    addYear(value, isKeepMonthEnd = false) {
        addYear(this.#date, value, isKeepMonthEnd);
        return this;
    }
}

/**
 * format time
 * @param fmt Format. If fmt isn't provided, the native Date.toString() function will be called
 * @returns function(Date): String
 */
export function dateToStringFactory(fmt) {
    return function (date) {
        if (!date || Object.prototype.toString.call(date) !== '[object Date]') {
            throw 'unsupported date type';
        }
        if (!fmt || Object.prototype.toString.call(fmt) !== '[object String]') {
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
 * @param fmt Format. If fmt isn't provided, the native Date.toString() function will be called
 * @param date Date
 * @returns String
 */
export function dateToString(date, fmt) {
    return dateToStringFactory(fmt)(date);
}

export function getFullDayInMonth(year, month) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}

export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function addMillisecond(date, value) {
    checkIntegerAndThrowError(value);
    return date.setTime(date.getTime() + value);
}

export function addSecond(date, value) {
    checkIntegerAndThrowError(value);
    return date.setTime(date.getTime() + value * 1000);
}

export function addMinute(date, value) {
    checkIntegerAndThrowError(value);
    return date.setTime(date.getTime() + value * 1000 * 60);
}

export function addHour(date, value) {
    checkIntegerAndThrowError(value);
    return date.setTime(date.getTime() + value * 1000 * 60 * 60);
}

export function addDay(date, value) {
    checkIntegerAndThrowError(value);
    console.log('day!!', date.getMilliseconds(), date.getTime())
    return date.setTime(date.getTime() + value * 1000 * 60 * 60 * 24);
}

export function addMonth(date, value, isKeepMonthEnd = false) {
    checkIntegerAndThrowError(value);
    let dayInMonth = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    date.setDate(1);
    let newMonth;
    let newYear;
    let newMonthTmp = date.getMonth() + value;
    if (newMonthTmp > 12) {
        newMonth = newMonthTmp % 12
        newYear = date.getFullYear() + Math.floor(newMonthTmp / 12);
    } else if (newMonthTmp < 1) {
        newMonth = newMonthTmp % 12 + 12
        newYear = date.getFullYear() - 1 + Math.ceil(newMonthTmp / 12);
    } else {
        newMonth = date.getMonth();
        newYear = date.getFullYear();
    }
    let fullDayInMonth = getFullDayInMonth(year, month);
    let newFullDayInMonth = getFullDayInMonth(newYear, newMonth);
    date.setFullYear(newYear);
    date.setMonth(newMonth);
    date.setDate(isKeepMonthEnd && fullDayInMonth === dayInMonth ? newFullDayInMonth : Math.min(dayInMonth, newFullDayInMonth));
    return date;
}

export function addYear(date, value, isKeepMonthEnd = false) {
    checkIntegerAndThrowError(value);
    return addMonth(date, value * 12, isKeepMonthEnd);
}

function checkType(obj, type) {
    if (Object.prototype.toString.call(type) !== '[object String]') {
        throw 'unsupported type param';
    }
    return Object.prototype.toString.call(obj) === '[object ' + type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase() + ']'
}

function checkIntegerAndThrowError(type) {
    if (!Number.isInteger(type)) {
        throw 'param must be integer';
    }
}