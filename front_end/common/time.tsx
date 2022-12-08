interface DayAvail {
    shiftStr: string, 
    dayStr: string[] 
}

export const TimeSolve = () => {
    const allDayofWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const getAvailableDay = (avail:string) => {  
        let day_avail:DayAvail = { 
            shiftStr: avail, 
            dayStr:[]
        }
        for(var i = 0; i < 7; i++) {
            let day = avail.slice(i*8, i*8+8)
            if(day.includes('0')) day_avail.dayStr.push(allDayofWeek[i])
        }
        return day_avail
    }

    const getShiftAvailable = (avail:string, day:number) => {
        return {
            day: day,
            shiftStr: avail.slice(day*8, day*8+8)
        }
        
    }

    const getCurrentShift = (order_arr:any) => {
        let allOrderinDay = [0, 0, 0, 0, 0, 0, 0]
        for(var i = 0; i < order_arr.length; i++) {
            let shift = order_arr[i]
            for(var j = 0; j < shift.length; j++) {
                if(shift[j] === '1') allOrderinDay[j]+=1
            }
        }
        return allOrderinDay
    }

    return { getAvailableDay, getShiftAvailable, getCurrentShift } 
}