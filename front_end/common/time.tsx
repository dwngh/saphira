export const TimeSolve = () => {
    const allDayofWeek = [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ Nhật",
    ];
    const getAvailableDay = (avail: string) => {
        let day_avail: string[] = [];
        for (let i = 0; i < 7; i++) {
            let day = avail.slice(i * 8, i * 8 + 8);
            if (day.includes("1")) {
                day_avail.push(allDayofWeek[i]);
            }
        }
        if (day_avail.length === 7 || day_avail.length === 0) {
            day_avail = ["Cả tuần"];
        }
        return day_avail;
    };

    const getAvailableDayBit = (avail: string) => {
        let bits = "";
        for (let i = 0; i < 7; i++) {
            let day = avail.slice(i * 8, i * 8 + 8);
            if (day.includes("1")) {
                bits += "1";
            } else bits += "0";
        }
        if (bits === "0000000") {
            bits = "1111111";
        }
        return bits;
    };

    const getShiftAvailable = (avail: string, day: number) => {
        if (!avail) return "11111111";
        return avail.slice(day * 8, day * 8 + 8);
    };

    const getCurrentShift = (order_arr: any) => {
        let allOrderinDay = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < order_arr.length; i++) {
            let shift = order_arr[i];
            for (let j = 0; j < shift.length; j++) {
                if (shift[j] === "1") allOrderinDay[j] += 1;
            }
        }
        return allOrderinDay;
    };

    const isEmpty = (avail) => {
        return avail === "00000000000000000000000000000000000000000000000000000000";
    }

    return {
        getAvailableDay,
        getShiftAvailable,
        getCurrentShift,
        getAvailableDayBit,
        isEmpty,
    };
};
