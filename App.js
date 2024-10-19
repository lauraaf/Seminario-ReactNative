import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { fetchUsers } from "./services/userService";
import { BlurView } from "expo-blur"; // Importamos el BlurView de expo-blur

export default function App() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

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
      <Text style={styles.title}>Lista de Usuarios</Text>

      {/* La lista de usuarios */}
      <UserList users={users} />

      {/* Botón para abrir el formulario */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>

      {/* Modal que muestra el formulario */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Agregamos un View fuera del BlurView para evitar problemas con la interacción */}
        <View style={styles.modalWrapper}>
          <BlurView intensity={100} style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <UserForm
                onUserAdded={() => {
                  setModalVisible(false);
                  loadUsers(); // Recargar la lista cuando se agregue un usuario
                }}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 70, // Mueve el título más abajo
    zIndex: 0, // Asegura que el título no bloquee otros componentes
  },
  openButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    zIndex: 10, // Aseguramos que el botón esté por encima de otros componentes
    elevation: 5, // Esto también ayuda a superponer en Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
