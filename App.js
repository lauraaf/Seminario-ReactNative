import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import UserForm from "./components/UserForm";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);

  // Función para cargar los usuarios desde el backend
  const fetchUsers = () => {
    axios
      .get("http://10.0.2.2:3000/api/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para agregar un nuevo usuario
  const addUser = (newUser) => {
    axios
      .post("http://10.0.2.2:3000/api/user", newUser)
      .then(() => {
        fetchUsers(); // Recargar la lista de usuarios tras agregar uno nuevo
      })
      .catch((error) => {
        console.error("Error al agregar usuario:", error);
      });
  };

  return (
    <View style={styles.container}>
      {/* El formulario está fijo en la parte superior */}
      <UserForm addUser={addUser} />

      {/* El título "Lista de Usuarios" también está fijo */}
      <Text style={styles.title}>Lista de Usuarios</Text>

      {/* La lista de usuarios es desplazable */}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nombre: {item.name}</Text>
            <Text>Email: {item.mail}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
