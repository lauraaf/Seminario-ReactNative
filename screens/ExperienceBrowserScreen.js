import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import ExperienceBrowser from "../components/ExperienceBrowser"
import {
  fetchExperiences,
  deleteExperience,
} from "../services/experienceService";
import { fetchUsers } from "../services/userService"; 

export default function ExperienceBrowserScreen() {
  const [experiences, setExperiences] = useState([]);
  const [users, setUsers] = useState([]); 
  const [searchText, setSearchText] = useState(""); 
  const [name, setName] = useState(""); 

  const handleSearch = () => {
    setName(searchText);
  };

  const loadExperiencesAndUsers = async () => {
    try {
      const [experiencesData, usersData] = await Promise.all([
        fetchExperiences(),
        fetchUsers(),
      ]);
      setExperiences(experiencesData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error al cargar experiencias y usuarios:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadExperiencesAndUsers(); 
    }, [])
  );

  const getUserNameById = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : "Desconocido";
  };

  const filter = (userName) => {
    const user = users.find((u) => u.name === userName);
    if (user === undefined) {
      return [];
    }
    return experiences.filter((u) => u.owner === user._id);
  };

  const handleDeleteExperience = async (experienceId) => {
    try {
      await deleteExperience(experienceId);
      setExperiences((prevExperiences) =>
        prevExperiences.filter((exp) => exp._id !== experienceId)
      );
    } catch (error) {
      console.error("Error al eliminar experiencia:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Experiencias</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Escribe un nombre"
        placeholderTextColor="#ccc"
        value={searchText}
        onChangeText={setSearchText}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      <ExperienceBrowser
        experiences={experiences}
        filter={filter}
        username={name}
        getUserNameById={getUserNameById}
        onDeleteExperience={handleDeleteExperience}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#8B0000",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});