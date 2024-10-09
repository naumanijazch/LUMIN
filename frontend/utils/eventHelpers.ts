export const getMonth = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[month];
};

export const getFullMonth = (month: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[month];
};

export const amToPm = (hour: number) => {
  if (hour === 0) {
    return { hour: 12, period: "AM" };
  } else if (hour === 12) {
    return { hour: 12, period: "PM" };
  } else if (hour < 12) {
    return { hour, period: "AM" };
  }
  return { hour: hour - 12, period: "PM" };
};

export const minutePadding = (minute: number) => {
  if (minute < 10) {
    return `0${minute}`;
  }
  return minute;
};
