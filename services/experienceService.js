import axios from "axios";

const API_URL = "http://10.0.2.2:3000/api/experiencias"; // Cambia a la URL correcta de tu API

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
    return response.data; // Devolvemos los datos de la nueva experiencia
  } catch (error) {
    console.error("Error al agregar experiencia:", error);
    throw error;
  }
};

// Eliminar una experiencia de la API
export const deleteExperience = async (experienceId) => {
  try {
    await axios.delete(`${API_URL}/${experienceId}`);
  } catch (error) {
    console.error("Error al eliminar experiencia:", error);
    throw error;
  }
};
