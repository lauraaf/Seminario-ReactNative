// App.js

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { fetchUsers } from "./services/userService";

export default function App() {
  const [users, setUsers] = useState([]);

  // Función para cargar los usuarios desde el servicio
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* El formulario permanece fijo en la parte superior */}
      <UserForm onUserAdded={loadUsers} />
      <Text style={styles.title}>Lista de Usuarios</Text>
      {/* La lista de usuarios debe ser desplazable */}
      <UserList users={users} />
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
});
