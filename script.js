let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps-list");

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (!isRunning) return;
  const li = document.createElement("li");
  li.textContent = formatTime(Date.now() - startTime);
  lapsList.appendChild(li);
});

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return (
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.` +
    `${milliseconds.toString().padStart(3, "0")}`
  );
}

function pad(unit) {
  return unit.toString().padStart(2, "0");
}
