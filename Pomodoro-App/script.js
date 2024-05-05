let workDurationInput = document.getElementById("focusDuration");
let shortBreakDurationInput = document.getElementById("shortBreakDuration");
let longBreakDurationInput = document.getElementById("longBreakDuration");
let completedRounds = 0;
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

    // Si el temporizador está pausado, pero el botón de Start se presiona,
    // necesitamos asegurarnos de que el temporizador se inicie correctamente
    isPaused = false;

    timerInterval = setInterval(() => {
        if (currentDuration > 0) {
            currentDuration--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            

            // Play a sound
            if (isWorking) {
                const notificationSound = document.getElementById("notificationSound");
                notificationSound.play();
                completedRounds++;
                // Actualizar el tiempo restante al descanso correspondiente

////////////////////////////////////////////////////////////////////////////////

                if (completedRounds % 4 === 0) {
                    // Si el número de rondas completadas es múltiplo de 4, activa el descanso largo
                 //   print(completedRounds);
                    currentDuration = longBreakDuration;
                    //updateTimerDisplay();
                } else {
                    // De lo contrario, activa el descanso corto
                    currentDuration = shortBreakDuration;
                }

/////////////////////////////////////////////////////////////////////////


                //currentDuration = shortBreakDuration;
                isWorking = false; // Cambiar a descanso
                startButton.disabled = false;
                isPaused = true;
            } else {
                //isPaused = true;
                startButton.disabled = false;
               // print(completedRounds);
               // isPaused = true;
                const breakNotificationSound = document.getElementById("breakNotificationSound");
                breakNotificationSound.play();
                
               
                isWorking = true; // Cambiar a trabajo
                currentDuration = workDuration;
                
            }
          //  isWorking = !isWorking;
            isPaused = true;
            updateTimerDisplay();
        }
        
    }, 1000);

    // Deshabilitar el botón de "Start" mientras el temporizador está en marcha
    startButton.disabled = true;

    // Habilitar el botón de "Pause" y "Reset"
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
