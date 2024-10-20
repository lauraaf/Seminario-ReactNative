import axios from "axios";

const API_URL = "http://10.0.2.2:3000/api/experiencias"; // URL correcta de tu API

// Obtener todas las experiencias desde la API
export const fetchExperiences = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devolvemos los datos de las experiencias
  } catch (error) {
    console.error("Error al obtener las experiencias:", error);
    throw error;
  }
};

// Agregar una nueva experiencia a la API
export const addExperience = async (newExperience) => {
  try {
    const response = await axios.post(API_URL, newExperience);
    const nuevaExperiencia = response.data;

    // Actualizar a los usuarios participantes con la nueva experiencia
    const { participants } = newExperience;
    if (participants && participants.length > 0) {
      await Promise.all(
        participants.map((userId) =>
          // Usamos el método POST y pasamos los parámetros en la URL según la lógica del backend
          axios.post(
            `http://10.0.2.2:3000/api/user/addExperiencias/${userId}/${nuevaExperiencia._id}`
          )
        )
      );
    }
    return nuevaExperiencia;
  } catch (error) {
    console.error("Error al agregar experiencia:", error);
    throw error;
  }
};

// Eliminar una experiencia de la API
export const deleteExperience = async (experienceId) => {
  try {
    if (!experienceId) {
      throw new Error("El ID de la experiencia es indefinido");
    }
    await axios.delete(`${API_URL}/${experienceId}`); // Aseguramos que el _id se pase correctamente
  } catch (error) {
    console.error("Error al eliminar experiencia:", error);
    throw error;
  }
};
