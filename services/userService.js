import axios from "axios";

const API_URL = "http://10.0.2.2:3000/api/user"; // Asegúrate de que esta URL sea correcta

// Obtener un usuario por su ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data.name; // Asumimos que la respuesta contiene el campo "name"
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// Obtener la lista de todos los usuarios
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Agregar un nuevo usuario
export const addUser = async (newUser) => {
  try {
    await axios.post(API_URL, newUser);
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};
