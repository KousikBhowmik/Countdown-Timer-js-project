document.querySelector(".submit").onclick = function () {
  const inputValues = getInput();

  let flag = false;
  let count = 0;
  for (const key in inputValues) {
    if (count === 0) {
      count++;
      continue;
    }
    if (inputValues[key] != "" && inputValues[key] !== 0) {
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

  for (const key in inputValues) {
    if (count === 0) {
      count++;
      continue;
    }
    if (typeof inputValues[key] === "number" && inputValues[key] !== 0) {
      totalSeconds = totalSeconds + myArr[count] * inputValues[key];
    }
    count++;
  }

  if (inputValues[".input-title"] != "") {
    document.querySelector(
      ".display-title"
    ).innerHTML = `${inputValues[".input-title"]}`;
  }

  const displayFun = () => {
    const myList = [".input-form", ".suggestiion", ".display-timer"];
    myList.forEach((element) => {
      const fild = document.querySelector(element);
      const displayStyle = window.getComputedStyle(fild).display;

      if (displayStyle === "none") {
        fild.style.display = "flex";
      } else {
        fild.style.display = "none";
      }
    });
  };

  displayFun();

  const countElement = document.querySelector(".display-time");

  const timeInterval = setInterval(() => updateTime(totalSeconds), 1000);

  function updateTime() {
    const days = Math.floor(totalSeconds / 86400)
      .toString()
      .padStart(2, 0);
    const hours = Math.floor((totalSeconds % 86400) / 3600)
      .toString()
      .padStart(2, 0);
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, 0);
    const seconds = (totalSeconds % 60).toString().padStart(2, 0);
    countElement.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;

    totalSeconds -= 1;
    if (totalSeconds < 0) {
      clearInterval(timeInterval);
      const audio = document.getElementById("myAudio");
      audio.play();
      const msg = document.querySelector(".display-message");
      msg.innerHTML = "your TASK is done!";
      countElementinnerHTML = `00:00:00:00`;
      function endFun() {
        audio.pause();
        displayFun();
      }
      setTimeout(endFun, 8000);
    }
  }
};

const quickSelect = () => {
  const idArray = [
    "task-1",
    "task-2",
    "task-3",
    "task-4",
    "task-5",
    "task-6",
    "task-7",
    "task-8",
  ];

  const getBox = document.querySelectorAll(".task-box");
  getBox.forEach((element) => {
    element.addEventListener("click", function (e) {
      const divId = "#" + this.id;
      const inputFields = [".input-title", ".input-min"];
      const boxList = [".task-title", ".task-time"];
      let i = 0;
      inputFields.forEach((field) => {
        let tmepClass = divId + " " + boxList[i];
        const inputElement = document.querySelector(field);
        inputElement.value = document.querySelector(tmepClass).innerHTML;
        i++;
      });
    });
  });
};

quickSelect();

function getInput() {
  const inputFields = [
    ".input-title",
    ".input-day",
    ".input-hour",
    ".input-min",
    ".input-sec",
  ];

  const values = {};

  inputFields.forEach((fieldId) => {
    const inputElement = document.querySelector(fieldId);
    values[fieldId] = inputElement.value;
    inputElement.value = "";
  });

  for (let key in values) {
    if (typeof values[key] === "string" && !isNaN(values[key])) {
      values[key] = Number(values[key]);
    }
  }

  return values;
}
