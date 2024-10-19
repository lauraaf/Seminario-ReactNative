// components/UserList.jsx

import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

export default function UserList({ users }) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>Nombre: {item.name}</Text>
          <Text>Email: {item.mail}</Text>
        </View>
      )}
      // Estas propiedades aseguran que el FlatList ocupe el espacio y sea desplazable
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1, // Permite que la lista crezca
    width: "100%", // Hace que la lista ocupe todo el ancho disponible
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
