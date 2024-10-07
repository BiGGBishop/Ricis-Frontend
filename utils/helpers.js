import { validator } from "./validator";

export const capitalizeFirstLetter = (word) => {
  return word?.charAt(0).toUpperCase() + word?.substring(1).toLowerCase();
};

export const cutString = (str, length) => {
  if (str?.length <= length) {
    return str;
  } else {
    return str?.substring(0, length);
  }
};

export const normalizeErrors = (error) => {
  const isErrorObject = typeof error?.data === "object";

  if (error?.data?.message) {
    return error?.data?.message;
  }

  if (isErrorObject) {
    if (error?.data?.error) {
      return error?.data?.error?.message;
    }
    if (error?.data?.errors) {
      const err = error?.data?.errors?.map((err) => err?.message).join(" ");
      return err;
    }
  } else {
    if (error?.data?.message) {
      return error?.data?.message;
    }
  }
};

export const resetForm = (data, name) => {
  if (typeof data === "object") {
    Object.keys(data).forEach((key) => {
      data[key] = "";
    });
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const formatDate = (inputDateStr) => {
  const inputDate = new Date(inputDateStr);
  const formattedDate = `${inputDate.getDate()}/${
    inputDate.getMonth() + 1
  }/${inputDate.getFullYear()}`;
  const formattedTime = `${inputDate.getHours()}:${inputDate.getMinutes()}:${inputDate.getSeconds()}`;
  return `${formattedDate} ${formattedTime}`;
};

export const getDateRange = (date) => {
  const now = new Date();
  const getDaysAgo = (days) => {
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - days,
      0,
      0,
      0,
      0
    );
  };
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );

  switch (date) {
    case "Anytime":
      return {
        start_date: "",
        end_date: "",
      };

    case "Today":
      // End of the day (11:59 PM)
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );

      return {
        start_date: startOfDay.toISOString(),
        end_date: endOfDay.toISOString(),
      };

    case "Yesterday":
      const startOfYesterday = getDaysAgo(1);
      // const yesterday = new Date(today);
      // yesterday.setDate(today.getDate() - 1);
      return {
        start_date: startOfYesterday.toISOString(),
        end_date: startOfDay.toISOString(),
      };

    case "Last_7_days":
      const sevenDaysAgo = getDaysAgo(7);
      // const lastWeek = new Date(today);
      // lastWeek.setDate(today.getDate() - 7);
      return {
        start_date: sevenDaysAgo.toISOString(),
        end_date: startOfDay.toISOString(),
      };

    case "Last_30_days":
      const thirtyDaysAgo = getDaysAgo(30);

      // const lastMonth = new Date(today);
      // lastMonth.setDate(today.getDate() - 30);
      return {
        start_date: thirtyDaysAgo.toISOString(),
        end_date: startOfDay.toISOString(),
      };

    default:
      return {
        start_date: "",
        end_date: "",
      };
  }
};

export const EnLocalDateFormat = (date) => {
  const year = date?.getFullYear();
  const month = ("0" + (date?.getMonth() + 1))?.slice(-2);
  const day = ("0" + date?.getDate())?.slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

// MM/DD/YY
export const UsLocalDateFormat = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit", // MM
    day: "2-digit", // DD
    year: "numeric", // YYYY
  });
  return formattedDate;
};

// export const removeEmptyFields = (obj) => {
//   for (let key in obj) {
//     if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
//       delete obj[key];
//     }
//   }
//   return obj;
// };

export const truncateWithEllipsisAndExtension = (filename, maxLength) => {
  // If filename is shorter than maxLength, return it as it is
  if (filename.length <= maxLength) {
    return filename;
  }

  // Determine the length of the filename without the extension
  const extensionIndex = filename.lastIndexOf(".");
  const filenameWithoutExtension =
    extensionIndex !== -1 ? filename.slice(0, extensionIndex) : filename;

  // Calculate how many characters should be taken from the start and end of the filename
  const charsFromStart = Math.ceil((maxLength - 4) / 2); // 4 is the length of "...."
  const charsFromEnd = maxLength - charsFromStart - 4;

  // Construct the truncated filename with "...." in the middle and the file extension at the end
  const truncatedFilename =
    filenameWithoutExtension.slice(0, charsFromStart) +
    "...." +
    filenameWithoutExtension.slice(-charsFromEnd) +
    (extensionIndex !== -1 ? filename.slice(extensionIndex) : "");

  return truncatedFilename;
};

export const getActionStatement = (member, action, executor) => {
  switch (action) {
    case "CREATE_ACCOUNT":
      return member === "Staff"
        ? `Staff account was created by ${executor}`
        : "User account was created";

    case "LOGIN":
      return `${member} logged into account`;

    case "LOGOUT":
      return `${member} logged out of account`;

    case "SUSPENDED":
      return `${member} account was suspended by ${executor}`;

    case "ACTIVATE":
      return `${member} account was activated by ${executor}`;

    case "RESET_PASSWORD":
      return `${member} password was updated`;
    // break;

    default:
      break;
  }
};

export const removeEmptyFields = (obj) => {
  let result = {};
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      result[key] = obj[key];
    }
  }
  return result;
};

export const convertToValidNumberType = (data, formFieldTypesObj) => {
  // const
  for (let key in data) {
    const currentType = formFieldTypesObj[key]?.type;
    // const isNumber = validator.validateNumber(data[key]);
    const isNumber = currentType === "NUMBER";
    if (isNumber) {
      data[key] = Number(data[key]);
    }
  }
  return data;
};

export const filter_type_data = {
  year: ["2024", "2023", "2022"],
  month: [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  week: ["week 1", "week 2", "week 3", "week 4"],
  day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export const getStatisticsDate = (filter_type, formData) => {
  let start_date;
  let end_date;
  console.log(formData);
  if (filter_type === "year") {
    const { year } = formData;
    start_date = new Date(year, 0, 1);
    end_date = new Date(year, 11, 31);
  }
  if (filter_type === "month") {
    const { year, month } = formData;
    const monthIndex = filter_type_data.month.indexOf(month);
    start_date = new Date(year, monthIndex, 1);
    end_date = new Date(year, monthIndex, 31);
  }
  if (filter_type === "week") {
    const { year, month, week } = formData;
    const monthIndex = filter_type_data.month.indexOf(month);
    const weekIndex = filter_type_data.week.indexOf(week);
    const start_day = 7 * (weekIndex + 1) - 6;
    const end_day = (weekIndex + 1) * 7;
    start_date = new Date(year, monthIndex, start_day);
    end_date = new Date(year, monthIndex, end_day);
  }
  if (filter_type === "day") {
    const { year, month, week, day } = formData;
    const monthIndex = filter_type_data.month.indexOf(month);
    const weekIndex = filter_type_data.week.indexOf(week);
    const dayIndex = filter_type_data.day.indexOf(day);
    const start_day = 7 * (weekIndex + 1) - 6;
    const end_day = (weekIndex + 1) * 7;
    start_date = new Date(year, monthIndex, start_day + dayIndex, 0);
    end_date = new Date(year, monthIndex, start_day, 23, 59, 59);
  }

  return { start_date, end_date };
};

export const getCurrentDate = () => {
  const currentDate = new Date();

  // Get the current year
  const currentYear = currentDate.getFullYear();

  // Get the current month (0-indexed, so January is 0)
  const currentMonth = currentDate.getMonth(); // Adding 1 to make it 1-indexed

  // Get the current week of the year
  const currentWeek = Math.ceil(
    (currentDate.getDate() + currentDate.getDay()) / 7
  );

  // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const currentDayOfWeek = currentDate.getDay();

  return { currentYear, currentMonth, currentWeek, currentDayOfWeek };
};

export const generateChartData = (chartData) => {
  let chart = {};
  for (let key in chartData) {
    if (chartData.hasOwnProperty(key)) {
      // const currentKey = "";
      chart[key] = chartData[key];
    }
  }
  return chart;
};

export const generateChartDataCategories = (selected, chartData) => {
  let categories = [];
  const data = Object.values(chartData);
  if (selected === "year") {
    categories = [
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

    return { categories, data };
  }

  if (selected === "month") {
    categories = [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
      "13th",
      "14th",
      "15th",
      "16th",
      "17th",
      "18th",
      "19th",
      "20th",
      "21st",
      "22nd",
      "23rd",
      "24th",
      "25th",
      "26th",
      "27th",
      "28th",
      "29th",
      "30th",
      "31st",
    ];
    return { categories, data };
  }

  if (selected === "week") {
    categories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return { categories, data };
  }

  if (selected === "day") {
    categories = [
      "00:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00",
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
    return { categories, data };
  }
};

export const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 10000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number?.toString();
  }
};

export const decodeUrlQueryParams = (queryString) => {
  let queryParams = {};

  decodeURIComponent(queryString)
    .split("&")
    .forEach((query) => {
      const [key, value] = query.split("=");
      queryParams[key] = value;
    });

  return queryParams;
};
