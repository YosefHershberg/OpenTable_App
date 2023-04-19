export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

export function formatTime(timeString: string) {
    const date = new Date(`1970-01-01T${timeString.slice(0, -1)}`);
    const formattedDate = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedDate;
}

export function formatDateForRes(dateString: string) {
    const date = new Date(dateString);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthOfYear = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${dayOfWeek}, ${dayOfMonth}, ${year}`;
    return formattedDate;
}