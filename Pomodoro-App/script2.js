let workDurationInput = document.getElementById("focusDuration");
let shortBreakDurationInput = document.getElementById("shortBreakDuration");
let longBreakDurationInput = document.getElementById("longBreakDuration");
let completedRounds = 0;
let workDuration = parseFloat(workDurationInput.value) * 60;
let shortBreakDuration = parseFloat(shortBreakDurationInput.value) * 60;
let longBreakDuration = parseFloat(longBreakDurationInput.value) * 60;
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const totalSessionsSpan = document.getElementById("totalSessions");
const averageDurationSpan = document.getElementById("averageDuration");
const sessionHistoryList = document.getElementById("sessionHistory");

let totalSessions = 0;
let totalDuration = 0;
let sessionStartTime = 0;
let sessionEndTime = 0;
let isPaused = true;
let currentDuration = 0;
let timerInterval;

function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateTimerDisplay() {
    document.getElementById("timer").textContent = formatTime(currentDuration);
}

function startTimer() {
    if (!isPaused) {
        return;
    }
    isPaused = false;
    sessionStartTime = new Date().getTime();
    timerInterval = setInterval(() => {
        if (currentDuration > 0) {
            currentDuration--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            sessionEndTime = new Date().getTime();
            const sessionDuration = (sessionEndTime - sessionStartTime) / 1000;
            totalDuration += sessionDuration;
            totalSessions++;
            totalSessionsSpan.textContent = totalSessions;
            averageDurationSpan.textContent = formatTime(totalDuration / totalSessions);
            const sessionHistoryItem = document.createElement("li");
            sessionHistoryItem.textContent = `Session ${totalSessions}: ${formatTime(sessionDuration)}`;
            sessionHistoryList.appendChild(sessionHistoryItem);
            isPaused = true;
            updateTimerDisplay();
        }
    }, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    currentDuration = parseInt(workDurationInput.value) * 60;
    updateTimerDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    sessionHistoryList.innerHTML = "";
}

workDurationInput.addEventListener("input", function() {
    currentDuration = parseInt(workDurationInput.value) * 60;
    updateTimerDisplay();
});

shortBreakDurationInput.addEventListener("input", function() {
    // No action needed
});

longBreakDurationInput.addEventListener("input", function() {
    // No action needed
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDigitalClock();
setInterval(updateDigitalClock, 1000);
updateTimerDisplay();
