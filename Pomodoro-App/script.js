let workDurationInput = document.getElementById("focusDuration");
let shortBreakDurationInput = document.getElementById("shortBreakDuration");
let longBreakDurationInput = document.getElementById("longBreakDuration");

let workDuration = parseFloat(workDurationInput.value) * 60;
let shortBreakDuration = parseFloat(shortBreakDurationInput.value) * 60;
let longBreakDuration = parseFloat(longBreakDurationInput.value) * 60;

workDurationInput.addEventListener("input", function() {
    workDuration = parseFloat(workDurationInput.value) * 60;
    if (!isPaused) {
        // Si el temporizador está en marcha, actualiza el tiempo de enfoque actual
        currentDuration = workDuration;
        updateTimerDisplay();
    }
});

shortBreakDurationInput.addEventListener("input", function() {
    shortBreakDuration = parseFloat(shortBreakDurationInput.value) * 60;
});

longBreakDurationInput.addEventListener("input", function() {
    longBreakDuration = parseFloat(longBreakDurationInput.value) * 60;
});


const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

function updateDigitalClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  hoursDisplay.textContent = hours;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
}

// Update the digital clock every second
setInterval(updateDigitalClock, 1000);

// Call the function initially to set the initial time
updateDigitalClock();

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
    if (!isPaused) {
        return; // Si ya se está ejecutando el temporizador, salir de la función
    }
    
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
    startButton.disabled = true; // Deshabilitar el botón de "Start"
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
