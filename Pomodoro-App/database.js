// Crear un nuevo registro en la base de datos
async function crearSesion(duracion, fecha) {
    try {
      const query = 'INSERT INTO sesiones (duracion, fecha) VALUES ($1, $2) RETURNING *';
      const result = await pool.query(query, [duracion, fecha]);
      return result.rows[0]; // Devuelve el registro recién creado
    } catch (error) {
      console.error('Error al crear la sesión:', error);
      throw error;
    }
  }
  
  // Obtener todos los registros de sesiones de la base de datos
  async function obtenerSesiones() {
    try {
      const query = 'SELECT * FROM sesiones ORDER BY fecha DESC';
      const result = await pool.query(query);
      return result.rows; // Devuelve todos los registros de sesiones
    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
      throw error;
    }
  }
  
  // Actualizar un registro de sesión en la base de datos
  async function actualizarSesion(id, duracion, fecha) {
    try {
      const query = 'UPDATE sesiones SET duracion = $1, fecha = $2 WHERE id = $3 RETURNING *';
      const result = await pool.query(query, [duracion, fecha, id]);
      return result.rows[0]; // Devuelve el registro actualizado
    } catch (error) {
      console.error('Error al actualizar la sesión:', error);
      throw error;
    }
  }
  
  // Eliminar un registro de sesión de la base de datos
  async function eliminarSesion(id) {
    try {
      const query = 'DELETE FROM sesiones WHERE id = $1';
      await pool.query(query, [id]);
      return true; // Devuelve true si la eliminación fue exitosa
    } catch (error) {
      console.error('Error al eliminar la sesión:', error);
      throw error;
    }
  }
  