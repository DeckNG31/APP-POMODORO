const axios = require('axios');

const url = 'http://localhost:3000/guardar-sesion';
const data = { duracion: '500', fecha: '2024-05-10' };

axios.post(url, data)
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
