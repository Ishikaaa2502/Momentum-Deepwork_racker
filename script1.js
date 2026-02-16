let time = 25 * 60; 
let timer;
let running = false;

const display = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const sessionCountEl = document.getElementById("sessionCount");
const scoreEl = document.getElementById("score");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");

let sessions = JSON.parse(localStorage.getItem("sessions")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

sessionCountEl.textContent = sessions;
scoreEl.textContent = sessions * 10;

updateHistory();

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  display.textContent =
    `${minutes < 10 ? "0" : ""}${minutes}:` +
    `${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (running) return;
  running = true;

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      running = false;
      completeSession();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  time = 25 * 60;
  updateDisplay();
}

function completeSession() {
  sessions++;
  sessionCountEl.textContent = sessions;
  scoreEl.textContent = sessions * 10;

  const date = new Date().toLocaleString();
  history.push(date);

  localStorage.setItem("sessions", sessions);
  localStorage.setItem("history", JSON.stringify(history));

  updateHistory();
  resetTimer();
}

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
