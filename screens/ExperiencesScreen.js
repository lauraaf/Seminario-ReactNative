import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import ExperienceForm from "../components/ExperienceForm"; // Formulario de experiencia
import ExperienceList from "../components/ExperienceList"; // Lista de experiencias
import {
  fetchExperiences,
  deleteExperience,
} from "../services/experienceService";
import Experience from "../models/experiencemodel"; // Modelo de experiencia

export default function ExperiencesScreen() {
  const [experiences, setExperiences] = useState([]); // Estado para almacenar experiencias
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar modal

  // Función para cargar las experiencias desde la API
  const loadExperiences = async () => {
    try {
      const data = await fetchExperiences();
      const experienceInstances = data.map(
        (exp) =>
          new Experience(exp._id, exp.owner, exp.description, exp.participants)
      );
      setExperiences(experienceInstances);
      console.log("Experiencias cargadas:", experiences);
    } catch (error) {
      console.error("Error al cargar experiencias:", error);
    }
  };

  // Función para eliminar una experiencia
  const handleDeleteExperience = async (experienceId) => {
    try {
      await deleteExperience(experienceId); // Eliminar la experiencia de la base de datos
      setExperiences((prevExperiences) =>
        prevExperiences.filter((exp) => exp.id !== experienceId)
      ); // Actualizar el estado local de experiencias
    } catch (error) {
      console.error("Error al eliminar experiencia:", error);
    }
  };

  // Cargar las experiencias al montar el componente
  useEffect(() => {
    loadExperiences();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Experiencias</Text>

      {/* Lista de experiencias */}
      <ExperienceList
        experiences={experiences}
        onDeleteExperience={handleDeleteExperience}
      />

      {/* Botón para abrir el formulario de nueva experiencia */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)} // Mostrar el modal
      >
        <Text style={styles.buttonText}>Crear Nueva Experiencia</Text>
      </TouchableOpacity>

      {/* Modal que contiene el formulario */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Cerrar el modal cuando se presiona el botón de atrás
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <ExperienceForm
              onExperienceAdded={() => {
                setModalVisible(false); // Cerrar el modal
                loadExperiences(); // Recargar las experiencias cuando se agregue una nueva
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Cerrar el modal
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
    backgroundColor: "#8B0000",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  openButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Hacer el fondo semi-transparente
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
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
    textAlign: "center",
  },
});
