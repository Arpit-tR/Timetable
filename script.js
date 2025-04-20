const timetable1 = {
  Monday: [
    "Free",
    "Free",
    "Free",
    "Break",
    "3C",
    "3C",
    "Break",
    "3D",
    "3D",
    "Free",
    "Free",
  ],
  Tuesday: [
    "Free",
    "3B",
    "3B",
    "Break",
    "3E",
    "3E",
    "Break",
    "Free",
    "Free",
    "Free",
    "Free",
  ],
  Wednesday: [
    "Free",
    "3G",
    "3G",
    "Break",
    "Free",
    "Free",
    "Break",
    "Free",
    "Free",
    "4A",
    "4A",
  ],
  Thursday: [
    "Free",
    "4D",
    "4D",
    "Break",
    "Free",
    "Free",
    "Break",
    "3A",
    "3A",
    "4B",
    "4B",
  ],
  Friday: [
    "Free",
    "4C",
    "4C",
    "Break",
    "3F",
    "3F",
    "Break",
    "Free",
    "Free",
    "Free",
    "Free",
  ],
};

const timetable2 = {
  Monday: [
    "Free",
    "5E",
    "5E",
    "Break",
    "Free",
    "Free",
    "Break",
    "Free",
    "Free",
    "5F",
    "5F",
  ],
  Tuesday: [
    "Free",
    "5C",
    "5C",
    "Break",
    "Free",
    "Free",
    "Break",
    "Free",
    "Free",
    "5B",
    "5B",
  ],
  Wednesday: [
    "Free",
    "4F",
    "4F",
    "Break",
    "Free",
    "Free",
    "Break",
    "4G",
    "4G",
    "Free",
    "Free",
  ],
  Thursday: [
    "Free",
    "Free",
    "Free",
    "Break",
    "5A",
    "5A",
    "Break",
    "Free",
    "Free",
    "5G",
    "5G",
  ],
  Friday: [
    "Free",
    "5D",
    "5D",
    "Break",
    "5H",
    "5H",
    "Break",
    "Free",
    "Free",
    "4E",
    "4E",
  ],
};

const timetable3 = {
  Monday: [
    "Free",
    "6G",
    "6G",
    "Break",
    "Free",
    "Free",
    "Break",
    "6F",
    "6F",
    "Free",
    "Free",
  ],
  Tuesday: [
    "Free",
    "Free",
    "Free",
    "Break",
    "6D",
    "6D",
    "Break",
    "6E",
    "6E",
    "7A",
    "7A",
  ],
  Wednesday: [
    "Free",
    "6H",
    "6H",
    "Break",
    "8E",
    "8E",
    "Break",
    "6A",
    "6A",
    "7B",
    "7B",
  ],
  Thursday: [
    "Free",
    "Free",
    "Break",
    "6B",
    "6B",
    "Break",
    "Free",
    "Free",
    "Free",
    "Free",
  ],
  Friday: [
    "Free",
    "7C",
    "7C",
    "Break",
    "Free",
    "Free",
    "Break",
    "6C",
    "6C",
    "Free",
    "Free",
  ],
};

const timetable4 = {
  Monday: [
    "Free",
    "7D",
    "7D",
    "Break",
    "7G",
    "7G",
    "Break",
    "Free",
    "Free",
    "7E",
    "7E",
  ],
  Tuesday: [
    "Free",
    "8B",
    "8B",
    "Break",
    "8F",
    "8F",
    "Break",
    "Free",
    "Free",
    "8G",
    "8G",
  ],
  Wednesday: [
    "Free",
    "Free",
    "Free",
    "Break",
    "7F",
    "7F",
    "Break",
    "8A",
    "8A",
    "Free",
    "Free",
  ],
  Thursday: [
    "Free",
    "7H",
    "7H",
    "Break",
    "Free",
    "Free",
    "Break",
    "8D",
    "8D",
    "Free",
    "Free",
  ],
  Friday: [
    "Free",
    "8C",
    "8C",
    "Break",
    "8H",
    "8H",
    "Break",
    "Free",
    "Free",
    "Free",
    "Free",
  ],
};

const periodTimes = [
  ["8:10 AM", "8:50 AM"],
  ["8:50 AM", "9:30 AM"],
  ["9:30 AM", "10:10 AM"],
  // Break
  ["10:10 AM", "10:20 AM"], // Break period
  ["10:20 AM", "11:00 AM"],
  ["11:00 AM", "11:40 AM"],
  // Break
  ["11:40 AM", "12:00 PM"], // Break period
  ["12:00 PM", "12:40 PM"],
  ["12:40 PM", "1:20 PM"],
  ["1:20 PM", "2:00 PM"],
  ["2:00 PM", "2:35 PM"], // Updated end time for the last period
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

    output1 = `Day: ${currentInfo.day} <br> Period: ${
      currentInfo.periodIndex + 1
    } <br> Class: ${
      timetable1[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;
    output2 = `Day: ${currentInfo.day} <br> Period: ${
      currentInfo.periodIndex + 1
    } <br> Class: ${
      timetable2[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;
    output3 = `Day: ${currentInfo.day} <br> Period: ${
      currentInfo.periodIndex + 1
    } <br> Class: ${
      timetable3[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;
    output4 = `Day: ${currentInfo.day} <br> Period: ${
      currentInfo.periodIndex + 1
    } <br> Class: ${
      timetable4[currentInfo.day][currentInfo.periodIndex] || "Free Period"
    }`;

    // Update class timings and upcoming classes
    const nextClassTiming1 = periodTimes[nextClassIndex][0];
    const nextClassTiming2 = periodTimes[nextClassIndex][0];
    const nextClassTiming3 = periodTimes[nextClassIndex][0];
    const nextClassTiming4 = periodTimes[nextClassIndex][0];

    document.getElementById(
      "timing1"
    ).innerHTML = `Class Timing: ${nextClassTiming1}`;
    document.getElementById(
      "timing2"
    ).innerHTML = `Class Timing: ${nextClassTiming2}`;
    document.getElementById(
      "timing3"
    ).innerHTML = `Class Timing: ${nextClassTiming3}`;
    document.getElementById(
      "timing4"
    ).innerHTML = `Class Timing: ${nextClassTiming4}`;

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
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming1)} min`;
    document.getElementById(
      "timeLeft2"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming2)} min`;
    document.getElementById(
      "timeLeft3"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming3)} min`;
    document.getElementById(
      "timeLeft4"
    ).innerHTML = `Time Left: ${calculateTimeLeft(nextClassTiming4)} min`;
  }

  document.getElementById("output1").innerHTML = output1;
  document.getElementById("output2").innerHTML = output2;
  document.getElementById("output3").innerHTML = output3;
  document.getElementById("output4").innerHTML = output4;
}

updateBoxes();
setInterval(updateBoxes, 60000); // Update every minute
