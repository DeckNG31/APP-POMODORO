let workDurationInput = document.getElementById("focusDuration");
let shortBreakDurationInput = document.getElementById("shortBreakDuration");
let longBreakDurationInput = document.getElementById("longBreakDuration");
let completedRounds = 0;
let workDuration = parseFloat(workDurationInput.value) * 60;
let shortBreakDuration = parseFloat(shortBreakDurationInput.value) * 60;
let longBreakDuration = parseFloat(longBreakDurationInput.value) * 60;
let totalSessionsSpan = document.getElementById("totalSessions");
let averageDurationSpan = document.getElementById("averageDuration");
let sessionHistoryList = document.getElementById("sessionHistory");

  //PRUEBA:
//////////////////////////////////////////////////////////
// Función para calcular la duración promedio de las sesiones
function calcularDuracionPromedio(sesiones) {
    if (sesiones.length === 0) return "00:00";

    const totalDuracion = sesiones.reduce((total, sesion) => total + sesion.duracion, 0);
    const promedioDuracion = totalDuracion / sesiones.length;

    const minutos = Math.floor(promedioDuracion / 60);
    const segundos = Math.floor(promedioDuracion % 60);

    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

const showHistoryButton = document.getElementById("showHistoryButton");
const sessionHistoryDiv = document.getElementById("sessionList");

// Función para mostrar el historial de sesiones y la duración promedio
function mostrarEstadisticas(sesiones) {
    const totalSessionsSpan = document.getElementById("totalSessions");
    const averageDurationSpan = document.getElementById("averageDuration");
    const sessionHistoryList = document.getElementById("sessionHistory");

    totalSessionsSpan.textContent = sesiones.length;
    averageDurationSpan.textContent = calcularDuracionPromedio(sesiones);

    // Limpiar la lista antes de volver a llenarla
    sessionHistoryList.innerHTML = "";
    sesiones.forEach(sesion => {
        const listItem = document.createElement("li");
        listItem.textContent = sesion.fecha + " - " + formatTime(sesion.duracion);
        sessionHistoryList.appendChild(listItem);
    });   
}

// Función para manejar el clic en el botón de mostrar historial
showHistoryButton.addEventListener("click", async () => {
    try {
        const response = await fetch('http://localhost:3000/sesiones');
        const sesiones = await response.json();
        mostrarEstadisticas(sesiones);
        showHistoryButton.style.display = "none";
        sessionHistoryDiv.style.display = "block";
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
    }
});




// Obtener las sesiones del servidor y luego mostrar las estadísticas
async function obtenerYMostrarEstadisticas() {
    try {
        const response = await fetch('http://localhost:3000/sesiones');
        const sesiones = await response.json();
        mostrarEstadisticas(sesiones);
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
    }
}

// Llamar a la función al cargar la página
obtenerYMostrarEstadisticas();

/////////////////////////////////////////////////////////////////////
const enviarDatosSesion = async (duracion, fecha) => {
    
      const response = await fetch('http://localhost:3000/guardar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ duracion, fecha }),
      });
      
  };


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


function obtenerFechaActual() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}



function startTimer() {
    if (!isPaused) {
        return; // Si ya se está ejecutando el temporizador, salir de la función
    }
    //enviarDatosSesion(workDuration, '1222-22-22');
    console.log("holis");
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
                console.log("Aqui es el area de descanso");
                enviarDatosSesion(workDuration,obtenerFechaActual());
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
