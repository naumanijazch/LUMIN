import moment from "moment";
import { WeekViewEvent } from "react-native-week-view";
import { CourseSummaryProps } from "../components/CourseSummary";

export const createFixedWeekDate = (
  day: number,
  hours: number,
  minutes = 0,
  seconds = 0
) => {
  const date = moment();
  date.isoWeekday(day);
  date.hours(hours);
  date.minutes(minutes);
  date.seconds(seconds);
  return date.toDate();
};

export const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

export const getMondayDate = () => {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
};

export const getDayNumber = (day: string) => {
  switch (day) {
    case "M":
      return 1;
    case "T":
      return 2;
    case "W":
      return 3;
    case "R":
      return 4;
    case "F":
      return 5;
    default:
      return 1;
  }
};

export const generateEvent = (event: CourseSummaryProps): WeekViewEvent[] => {
  let allEvents: WeekViewEvent[] = [];
  const color = generateColor();

  event.days.forEach((day) => {
    const newEvent: WeekViewEvent = {
      id: event.id,
      courseName: event.courseName,
      courseCode: event.courseCode,
      description: event.description,
      location: event.location,
      instructor: event.instructor,
      section: event.section,
      days: event.days,
      startTime: event.startTime,
      endTime: event.endTime,

      startDate: createFixedWeekDate(
        getDayNumber(day),
        parseInt(event.startTime.split(":")[0]),
        parseInt(event.startTime.split(":")[1])
      ),
      endDate: createFixedWeekDate(
        getDayNumber(day),
        parseInt(event.endTime.split(":")[0]),
        parseInt(event.endTime.split(":")[1])
      ),
      eventKind: "standard",
      resolveOverlap: "stack",
      stackKey: event.courseCode,
      color: color,
      style: {
        borderRadius: 5,
      },
    };
    allEvents.push(newEvent);
  });

  return allEvents;
};
