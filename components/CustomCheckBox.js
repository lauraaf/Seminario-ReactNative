import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export default function CustomCheckBox({ label, onValueChange, value }) {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={styles.checkboxContainer}
    >
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {/* Mostramos el label (nombre del usuario) */}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16, // Asegúrate de que el estilo del texto sea visible
    color: "#000", // Ajusta el color para que sea visible sobre el fondo
  },
});
