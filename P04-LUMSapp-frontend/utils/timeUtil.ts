export function getTimeAgo(timestamp: string): string {
    const previousTime: Date = new Date(timestamp);
    const currentTime: Date = new Date();
    const timeDifference: number =
        currentTime.getTime() - previousTime.getTime();

    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}

export function convertTo12HourFormat(timestamp: string): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let formattedHours: number | string = hours % 12 || 12;
    const period = hours < 12 ? "AM" : "PM";

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
}
