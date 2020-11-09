  function dateFormatFactory(fmt) {
        return function dateFormat(date) {
            let ret
            const dateFormatObj = {
                'Y+': date.getFullYear(), // 年
                'y+': date.getFullYear(), // 年
                'M+': (date.getMonth() + 1), // 月
                'd+': date.getDate(), // 日
                'D+': date.getDate(), // 日
                'H+': date.getHours(), // 时（24小时）
                'h+': date.getHours() % 12, // 时（12小时）
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'S+': date.getTime().toString().substring(date.getTime().toString().length - 3) // 毫秒
            }
            //替换模板字符串为时间
            for (let k in dateFormatObj) {
                while (ret = new RegExp('(' + k + ')').exec(fmt)) {
                    fmt = fmt.replace(new RegExp(ret[1], 'g'), (ret[1].length === 1) ? dateFormatObj[k] : dateFormatObj[k].toString().padStart(ret[1].length, '0'))
                }
            }
            return fmt
        }
    }

    function dateFormat(date, fmt) {
        let ret
        const dateFormatObj = {
            'Y+': date.getFullYear(), // 年
            'y+': date.getFullYear(), // 年
            'M+': (date.getMonth() + 1), // 月
            'd+': date.getDate(), // 日
            'D+': date.getDate(), // 日
            'H+': date.getHours(), // 时（24小时）
            'h+': date.getHours() % 12, // 时（12小时）
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'S+': date.getTime().toString().substring(date.getTime().toString().length - 3) // 毫秒
        }
        //替换模板字符串为时间
        for (let k in dateFormatObj) {
            while (ret = new RegExp('(' + k + ')').exec(fmt)) {
                fmt = fmt.replace(new RegExp(ret[1], 'g'), (ret[1].length === 1) ? dateFormatObj[k] : dateFormatObj[k].toString().padStart(ret[1].length, '0'))
            }
        }
        return fmt
    }