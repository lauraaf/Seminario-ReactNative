import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function UserList({ users, onDeleteUser }) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>Nombre: {item.getFullName()}</Text>
          <Text>Email: {item.getEmail()}</Text>
          <Text>Comentario: {item.comment}</Text>
          <Text>Experiencias: {item.experiencies.join(", ")}</Text>

          {/* Botón Eliminar */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteUser(item.id)} // Llamamos a la función onDeleteUser con el ID del usuario
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
