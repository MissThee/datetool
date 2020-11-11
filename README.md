# date-tool

## Overview
An open source simple JavaScript Date library for formatting and processing.

## Getting Started
install by npm
```
npm i @missthee/datetool
```
use
```js
import { dateToString, addDay, DateHepler } from "@missthee/datetool";
let date = new Date('2000/01/01');
//formatting
console.log(dateToString(date, 'yyyy-MM-dd')); // 2000-01-01
//processing
//NOTICE: All calculation operations will change the incoming Date object
let result = addDay(date, 1); 
console.log(result); // 2000-01-02
console.log(date);   // 2000-01-02
```

## Example
```js
import {DateHelper, dateToStringFactory, dateToString, getFullDayInMonth, isLeapYear, addMillisecond, addSecond, addMinute, addHour, addDay, addMonth, addYear,} from "@missthee/datetool";
let date = new Date('2000-01-01');

//formatting
dateToString(date, 'yyyyMMdd');     //20000101
let dts = dateToStringFactory('yyyyMMdd');
dts(date);                          //20000101
dts(new Date('2020/11/11'));        //20201111

//processing
//NOTICE: All calculation operations will change the incoming Date object
new DateHelper(date).addDay(1).addMonth(1).addYear(-1).getDate();
addYear(date, 1);
addMonth(date, 1);
addDay(date, 1);
addHour(date, 1);
addMinute(date, 1);
addSecond(date, 1);
addMillisecond(date, 1);

//misc
isLeapYear(2000); //true
getFullDayInMonth(2000, 1); //29

```

## Converting to String
| Format Key | Description | Value |
| :---- | :---- | :---- |
| yyyy | The year | `1999` `2001` | 
| yy | The year's last two-digit number | `99` `01` | 
| MM | The month of the year with leading zero | `01` - `12` | 
| M | The month of the year between 1-12 | `1` - `12` | 
| dd | The day of the month with leading zero | `01` - `31` | 
| d | The day of the month between 1 and 31 | `1`  - `31` | 
| HH | The hour of the day with leading zero | `00` - `23` | 
| H | The hour of the day between 0-23 | `0` - `23` | 
| hh | The hour of the day with leading zero | `01` - `12` | 
| h | The hour of the day between 1-12 | `1` - `12` | 
| mm | The minute of the hour with leading zero | `00` - `59` | 
| m | The minute of the hour between 0-59 | `0` - `59` | 
| ss | The seconds of the minute with leading zero | `00` - `59` | 
| s | The seconds of the minute between 0-59 | `0` - `59` |
| SSS | The milliseconds of the second between .000-.999 | `000` - `999` |
| SS | The milliseconds of the second between .00-.99 | `00` - `99` |
| S | The milliseconds of the second between .0-.9 | `0` - `9` |
