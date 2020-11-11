# date-tool

## Overview
An open source simple JavaScript Date library for formatting and processing.

## Getting Started
```js
```

## Example
```js
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

## Misc
```js
isLeapYear(2008)                  // true|false. <static>
getFullDayInMonth(2007, 9)           // 31 <static>
```