class TimeAndDateHanler {
  constructor() {}
  //  Formats date  e.g 27 may, 2003
  formatDate(date) {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-UK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  formatTime(date) {
    const newDate = new Date(date);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // converts to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = hours + ":" + minutes + " " + ampm;
    return formattedTime;
  }
}

export const time = new TimeAndDateHanler();

export default TimeAndDateHanler;
