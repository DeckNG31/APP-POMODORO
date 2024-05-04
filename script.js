let workDurationInput = document.getElementById("focusDuration");
let shortBreakDurationInput = document.getElementById("shortBreakDuration");
let longBreakDurationInput = document.getElementById("longBreakDuration");

let workDuration = parseFloat(workDurationInput.value) * 60;
let shortBreakDuration = parseFloat(shortBreakDurationInput.value) * 60;
let longBreakDuration = parseFloat(longBreakDurationInput.value) * 60;

workDurationInput.addEventListener("change", function() {
    workDuration = parseFloat(workDurationInput.value) * 60;
    if (currentDuration === workDuration) {
        updateTimerDisplay();
    }
});

shortBreakDurationInput.addEventListener("change", function() {
    shortBreakDuration = parseFloat(shortBreakDurationInput.value) * 60;
    if (currentDuration === shortBreakDuration) {
        updateTimerDisplay();
    }
});

longBreakDurationInput.addEventListener("change", function() {
    longBreakDuration = parseFloat(longBreakDurationInput.value) * 60;
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

let isWorking = true; // Variable para rastrear si estamos en un período de trabajo

function startTimer() {
    timerInterval = setInterval(() => {
        if (currentDuration > 0) {
            currentDuration--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            // Play a sound or display a notification
            // Switch between work session and break
            if (isWorking) {
                currentDuration = shortBreakDuration;
                isWorking = false; // Cambiar a descanso
            } else {
                currentDuration = workDuration;
                isWorking = true; // Cambiar a trabajo
            }
            updateTimerDisplay();
        }
    }, 1000);
    isPaused = false;
    startButton.disabled = false;
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
