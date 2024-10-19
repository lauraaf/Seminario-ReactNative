import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function UserList({ users }) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>Nombre: {item.name}</Text>
          <Text>Email: {item.mail}</Text>
          <Text>Comentario: {item.comment}</Text>
          <Text>Experiencias: {item.experiencies.join(", ")}</Text>
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
});
