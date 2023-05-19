const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const getDateString = (str) => {
    const month = months[new Date(str).getMonth()];
    const day = new Date(str).getDate();
    const year = new Date(str).getFullYear();
    return `${day} ${month} ${year}`;
}
const getDuration = (event) =>{
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    let diff =(end - start) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
    // return  duration > 24 ? Math. abs(Math. round(duration/24)) + ' Day' : duration + ' hr';
}

const showDays = (event) => {
    return `${getDateString(event.startDate)} ${getTime(event.startDate)}
        to ${getDateString(event.endDate)} ${getTime(event.endDate)}`
}
const getTime = (date) => {
    const start = new Date(date);
    const hoursMin = start.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return hoursMin;
}
const sortDescDate = (arr) => {
    return arr.sort((a,b)=>new Date(b.startDate).getTime()-new Date(a.startDate).getTime());
}

const sortAscDate = (arr) => {
    return arr.sort((a,b)=>new Date(a.startDate).getTime()-new Date(b.startDate).getTime());
}

export { getTime, getDateString, getDuration, showDays, sortAscDate, sortDescDate };