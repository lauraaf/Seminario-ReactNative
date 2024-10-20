import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Actualizamos la importación
import { fetchUsers } from "../services/userService";
import { addExperience } from "../services/experienceService";

export default function ExperienceForm({ onExperienceAdded }) {
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState("");
  const [participants, setParticipants] = useState([]);
  const [description, setDescription] = useState("");

  // Cargar los usuarios desde la API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async () => {
    try {
      const newExperience = { owner, participants, description };
      await addExperience(newExperience);
      onExperienceAdded(); // Llama a la función que se pasa como prop para recargar la lista de experiencias
      setOwner("");
      setParticipants([]);
      setDescription("");
    } catch (error) {
      console.error("Error al agregar experiencia:", error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Propietario:</Text>
      <Picker
        selectedValue={owner}
        onValueChange={(itemValue) => setOwner(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccionar propietario" value="" />
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.name} value={user._id} />
        ))}
      </Picker>

      <Text style={styles.label}>Participantes:</Text>
      <Picker
        selectedValue={participants}
        onValueChange={(itemValue) => setParticipants([itemValue])} // Manejo básico, ajustable a múltiples selecciones
        style={styles.input}
        mode="dropdown"
      >
        <Picker.Item label="Seleccionar participantes" value="" />
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.name} value={user._id} />
        ))}
      </Picker>

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.textArea}
        multiline={true}
        maxLength={300}
        placeholder="Máximo 300 caracteres"
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 100,
  },
});
