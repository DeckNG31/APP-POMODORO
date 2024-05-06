


const enviarDatosSesion = async (duracion, fecha) => {
    
      const response = await fetch('http://localhost:3000/guardar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ duracion, fecha }),
      });
      
  };
  
  // Llama a esta función cuando una sesión se complete
  const duracionSesion = 1110; // Duración de la sesión en minutos
  const fechaSesion = '2024-05-10'; // Fecha de la sesión
  enviarDatosSesion(duracionSesion, obtenerFechaActual);
  

  function obtenerFechaActual() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}