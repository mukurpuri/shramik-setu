const isLeap = year => {
    return new Date(year, 1, 29).getDate() === 29;
}
const setDates = index => {
    let dates = [];
    for(let i = 1; i <= index; i++) {
        dates.push(i);
    }
    return dates;
}
const getDates = (month, year) => {
    if(!month) {
        return [];
    }
    if(month.toLowerCase() === "feb") {
        if(isLeap(year)) {
            return setDates(29)
        } else {
            return setDates(28)
        }
    } else {
        if(["jan", "mar", "may", "jul", "aug", "oct", "dec"].includes(month.toLowerCase())) {
            return setDates(31)
        } else {
            return setDates(30)
        }
    }
    return setDates(31);
}

export { getDates }





