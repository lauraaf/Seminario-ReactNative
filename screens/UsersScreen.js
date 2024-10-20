import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { fetchUsers, deleteUser } from "../services/userService";
import User from "../models/usermodel";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      const userInstances = data.map(
        (user) =>
          new User(
            user._id,
            user.name,
            user.mail,
            user.password,
            user.comment,
            user.experiencies
          )
      );
      setUsers(userInstances);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <UserList users={users} onDeleteUser={handleDeleteUser} />
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <UserForm
              onUserAdded={() => {
                setModalVisible(false);
                loadUsers();
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
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
  },
  openButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
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
