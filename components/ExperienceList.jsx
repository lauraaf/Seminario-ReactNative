import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function ExperienceList({ experiences, onDeleteExperience }) {
  return (
    <FlatList
      data={experiences}
      keyExtractor={(item) =>
        item._id ? item._id.toString() : Math.random().toString()
      } // Asegúrate de que siempre haya una clave única
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.label}>
            Propietario: {item.owner ? item.owner.name : "Desconocido"}
          </Text>
          <Text style={styles.label}>Descripción: {item.description}</Text>
          <Text style={styles.label}>Participantes:</Text>
          {item.participants && item.participants.length > 0 ? (
            item.participants.map((participant) => (
              <Text
                key={
                  participant._id
                    ? participant._id.toString()
                    : Math.random().toString()
                }
                style={styles.participant}
              >
                {participant.name}
              </Text>
            ))
          ) : (
            <Text style={styles.participant}>Sin participantes</Text>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteExperience(item._id)}
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
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#8B0000",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  participant: {
    fontSize: 14,
    color: "#fff",
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
