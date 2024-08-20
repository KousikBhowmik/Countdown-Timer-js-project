document.getElementById("start").onclick = function () {
  const oneFun = myFunction();
  const element1 = document.querySelector(".set-time");
  const element2 = document.getElementById("quick");
  const element3 = document.querySelector(".suggestiion");
  const element4 = document.querySelector(".display-time");
  const element5 = document.querySelector(".message");
  const countElement = document.querySelector(".display-countdown");
  let flag = false;
  let count = 0;
  for (const key in oneFun) {
    if (count === 0) {
      count++;
      continue;
    }
    if (oneFun[key] != "" && oneFun[key] !== 0) {
      flag = true;
      break;
    }
  }
  if (flag != true) {
    window.alert("Everything is emply :(");
    return;
  }
  let totalSeconds = 0;
  count = 0;
  const myArr = [1, 86400, 3600, 60, 1];

  for (const key in oneFun) {
    if (count === 0) {
      count++;
      continue;
    }
    if (oneFun[key] != "" && oneFun[key] !== 0) {
      totalSeconds = totalSeconds + myArr[count] * oneFun[key];
    }
    count++;
  }
  if (oneFun["set-task"] != "" && oneFun["set-task"].length > 5) {
    document.querySelector(".display-task").innerHTML = `${oneFun["set-task"]}`;
  }
  element1.style.visibility = "hidden";
  element2.style.visibility = "hidden";
  element3.style.visibility = "hidden";
  element4.style.visibility = "visible";
  const timeInterval = setInterval(() => updateTime(totalSeconds), 1000);

  function updateTime() {
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    countElement.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;

    totalSeconds -= 1;
    if (totalSeconds < 0) {
      clearInterval(timeInterval);
      element5.style.visibility = "visible";
      countElement.innerHTML = `0:0:0:0`;
      function endFun() {
        element1.style.visibility = "visible";
        element2.style.visibility = "visible";
        element3.style.visibility = "visible";
        element4.style.visibility = "hidden";
        element5.style.visibility = "hidden";
      }
      setTimeout(endFun, 8000);
    }
  }
};

function myFunction() {
  const inputFields = [
    "set-task",
    "set-day",
    "set-hours",
    "set-min",
    "set-sec",
  ];

  const values = {};

  inputFields.forEach((fieldId) => {
    const inputElement = document.getElementById(fieldId);
    values[fieldId] = inputElement.value;
    inputElement.value = "";
  });

  return values;
}
