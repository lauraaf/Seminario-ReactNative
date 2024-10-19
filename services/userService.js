import axios from "axios";

const API_URL = "http://10.0.2.2:3000/api/user";

// Obtener la lista de usuarios desde la API
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Agregar un nuevo usuario a la API
export const addUser = async (newUser) => {
  try {
    await axios.post(API_URL, newUser);
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    throw error;
  }
};
