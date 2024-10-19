import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { addUser } from "../services/userService";

export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const newUser = { name, mail, password, comment }; // Eliminamos experiencies
      await addUser(newUser); // Llama al servicio para agregar el usuario
      setName("");
      setMail("");
      setPassword("");
      setComment("");
      onUserAdded(); // Cierra el modal y recarga la lista de usuarios
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Agregar Usuario</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Para ocultar la contraseña
        style={styles.input}
      />
      <TextInput
        placeholder="Comentario"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});
