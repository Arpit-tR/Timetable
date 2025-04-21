const timetable1 = {
  Monday: ["Free", "Free", "Break", "3C", "Break", "3D", "Free"],
  Tuesday: ["Free", "3B", "Break", "3E", "Break", "Free", "Free"],
  Wednesday: ["Free", "3G", "Break", "Free", "Break", "Free", "4A"],
  Thursday: ["Free", "4D", "Break", "Free", "Break", "3A", "4B"],
  Friday: ["Free", "4C", "Break", "3F", "Break", "Free", "Free"],
};

const timetable2 = {
  Monday: ["Free", "5E", "Break", "Free", "Break", "Free", "5F"],
  Tuesday: ["Free", "5C", "Break", "Free", "Break", "Free", "5B"],
  Wednesday: ["Free", "4F", "Break", "Free", "Break", "4G", "Free"],
  Thursday: ["Free", "Free", "Break", "5A", "Break", "Free", "5G"],
  Friday: ["Free", "5D", "Break", "5H", "Break", "Free", "4E"],
};

const timetable3 = {
  Monday: ["Free", "6G", "Break", "Free", "Break", "6F", "Free"],
  Tuesday: ["Free", "Free", "Break", "6D", "Break", "6E", "7A"],
  Wednesday: ["Free", "6H", "Break", "8E", "Break", "6A", "7B"],
  Thursday: ["Free", "Break", "6B", "Break", "Free", "Free"],
  Friday: ["Free", "7C", "Break", "Free", "Break", "6C", "Free"],
};

const timetable4 = {
  Monday: ["Free", "7D", "Break", "7G", "Break", "Free", "7E"],
  Tuesday: ["Free", "8B", "Break", "8F", "Break", "Free", "8G"],
  Wednesday: ["Free", "Free", "Break", "7F", "Break", "8A", "Free"],
  Thursday: ["Free", "7H", "Break", "Free", "Break", "8D", "Free"],
  Friday: ["Free", "8C", "Break", "8H", "Break", "Free", "Free"],
};

const periodTimes = [
  ["8:10 AM", "8:50 AM"],
  ["8:50 AM", "10:10 AM"],
  ["10:10 AM", "10:20 AM"], // Break period
  ["10:20 AM", "11:40 AM"],
  ["11:40 AM", "12:00 PM"], // Break period
  ["12:00 PM", "1:20 PM"],
  ["1:20 PM", "2:40 PM"], // Updated end time for the last period
];

function getCurrentPeriodIndex() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < periodTimes.length; i++) {
    const [start, end] = periodTimes[i];
    const [startHour, startMin, startAmPm] = parseTime(start);
    const [endHour, endMin, endAmPm] = parseTime(end);

    const startMins = convertToMinutes(startHour, startMin, startAmPm);
    const endMins = convertToMinutes(endHour, endMin, endAmPm);

    if (currentTime >= startMins && currentTime < endMins) {
      return i;
    }
  }
  return -1;
}

function parseTime(timeStr) {
  const [time, ampm] = timeStr.split(" ");
  const [hour, minute] = time.split(":").map(Number);
  return [hour, minute, ampm];
}

function convertToMinutes(hour, minute, ampm) {
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function calculateTimeLeft(nextClassTime) {
  const now = new Date();
  const [time, ampm] = nextClassTime.split(" ");
  const [hour, minute] = time.split(":").map(Number);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  const classTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute
  );
  const timeDiff = classTime - now;
  return Math.max(0, Math.floor(timeDiff / 60000)); // Return time left in minutes
}

function updateBoxes() {
  const now = new Date();

  // Create an object to store current day and time
  const currentInfo = {
    day: now.toLocaleDateString("en-US", { weekday: "long" }),
    periodIndex: getCurrentPeriodIndex(),
  };

  let output1 = "No Class";
  let output2 = "No Class";
  let output3 = "No Class";
  let output4 = "No Class";

  if (currentInfo.periodIndex !== -1) {
    const nextClassIndex =
      currentInfo.periodIndex + 1 < periodTimes.length
        ? currentInfo.periodIndex + 1
        : currentInfo.periodIndex;

    // Determine the period display based on the current period index
    const periodDisplay = (index) => {
      switch (index) {
        case 0:
          return "1"; // 1st period
        case 1:
          return "2+3"; // 2nd period
        case 2:
          return "Break"; // 3rd period
        case 3:
          return "4+5"; // 4th period
        case 4:
          return "Break"; // 5th period
        case 5:
          return "6+7"; // 6th period
        case 6:
          return "8+9"; // 7th period
        default:
          return ""; // Default case
      }
    };

    output1 = `Day: ${currentInfo.day} <br> Period: ${periodDisplay(
      currentInfo.periodIndex
    )} <br> Class: ${
      timetable1[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;
    output2 = `Day: ${currentInfo.day} <br> Period: ${periodDisplay(
      currentInfo.periodIndex
    )} <br> Class: ${
      timetable2[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;
    output3 = `Day: ${currentInfo.day} <br> Period: ${periodDisplay(
      currentInfo.periodIndex
    )} <br> Class: ${
      timetable3[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;
    output4 = `Day: ${currentInfo.day} <br> Period: ${periodDisplay(
      currentInfo.periodIndex
    )} <br> Class: ${
      timetable4[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;

    // Update class timings and upcoming classes
    const nextClassTiming1 = periodTimes[nextClassIndex];
    const nextClassTiming2 = periodTimes[nextClassIndex];
    const nextClassTiming3 = periodTimes[nextClassIndex];
    const nextClassTiming4 = periodTimes[nextClassIndex];

    document.getElementById(
      "timing1"
    ).innerHTML = `Class Timing: ${nextClassTiming1[0]} - ${nextClassTiming1[1]}`;
    document.getElementById(
      "timing2"
    ).innerHTML = `Class Timing: ${nextClassTiming2[0]} - ${nextClassTiming2[1]}`;
    document.getElementById(
      "timing3"
    ).innerHTML = `Class Timing: ${nextClassTiming3[0]} - ${nextClassTiming3[1]}`;
    document.getElementById(
      "timing4"
    ).innerHTML = `Class Timing: ${nextClassTiming4[0]} - ${nextClassTiming4[1]}`;

    document.getElementById("upcomingClass1").innerHTML = `Upcoming Class: ${
      timetable1[currentInfo.day][nextClassIndex] || "No Class"
    }`;
    document.getElementById("upcomingClass2").innerHTML = `Upcoming Class: ${
      timetable2[currentInfo.day][nextClassIndex] || "No Class"
    }`;
    document.getElementById("upcomingClass3").innerHTML = `Upcoming Class: ${
      timetable3[currentInfo.day][nextClassIndex] || "No Class"
    }`;
    document.getElementById("upcomingClass4").innerHTML = `Upcoming Class: ${
      timetable4[currentInfo.day][nextClassIndex] || "No Class"
    }`;

    document.getElementById(
      "timeLeft1"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming1[0])} min`;
    document.getElementById(
      "timeLeft2"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming2[0])} min`;
    document.getElementById(
      "timeLeft3"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming3[0])} min`;
    document.getElementById(
      "timeLeft4"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming4[0])} min`;
  }

  document.getElementById("output1").innerHTML = output1;
  document.getElementById("output2").innerHTML = output2;
  document.getElementById("output3").innerHTML = output3;
  document.getElementById("output4").innerHTML = output4;
}
/*
document.getElementById("box1").addEventListener("click", function () {
  window.open("arpit.html", "_blank");
});

document.getElementById("box2").addEventListener("click", function () {
  window.open("timetables/bicky.html", "_blank");
});

document.getElementById("box3").addEventListener("click", function () {
  window.open("timetables/debmalya.html", "_blank");
});

document.getElementById("box4").addEventListener("click", function () {
  window.open("timetables/dipankar.html", "_blank");
});
*/
updateBoxes();
setInterval(updateBoxes, 60000); // Update every minute
