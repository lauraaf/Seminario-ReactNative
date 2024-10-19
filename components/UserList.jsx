import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserList({ users }) {
  return (
    <View style={styles.list}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {users.map((user) => (
        <View key={user._id} style={styles.item}>
          <Text>Nombre: {user.name}</Text>
          <Text>Email: {user.mail}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
