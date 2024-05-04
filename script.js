let workDurationInput = document.getElementById("focusDuration");
let shortBreakDurationInput = document.getElementById("shortBreakDuration");
let longBreakDurationInput = document.getElementById("longBreakDuration");

let workDuration = parseInt(workDurationInput.value) * 60;
let shortBreakDuration = parseInt(shortBreakDurationInput.value) * 60;
let longBreakDuration = parseInt(longBreakDurationInput.value) * 60;

workDurationInput.addEventListener("change", function() {
    workDuration = parseInt(workDurationInput.value) * 60;
    if (currentDuration === workDuration) {
        updateTimerDisplay();
    }
});

shortBreakDurationInput.addEventListener("change", function() {
    shortBreakDuration = parseInt(shortBreakDurationInput.value) * 60;
    if (currentDuration === shortBreakDuration) {
        updateTimerDisplay();
    }
});

longBreakDurationInput.addEventListener("change", function() {
    longBreakDuration = parseInt(longBreakDurationInput.value) * 60;
    if (currentDuration === longBreakDuration) {
        updateTimerDisplay();
    }
});

let currentDuration = workDuration;
let timerInterval;
let isPaused = true;

const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(currentDuration);
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (currentDuration > 0) {
            currentDuration--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            // Play a sound or display a notification
            // Switch between work session and break
            if (currentDuration === 0) {
                currentDuration = shortBreakDuration;
                startButton.disabled = false;
            } else if (currentDuration === 0 && shortBreakDuration === currentDuration) {
                currentDuration = workDuration;
            }
            updateTimerDisplay();
        }
    }, 1000);
    isPaused = false;
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
    currentDuration = workDuration;
    updateTimerDisplay();
    isPaused = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateTimerDisplay();
