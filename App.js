import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersScreen from "./screens/UsersScreen"; // Pantalla de usuarios
import ExperiencesScreen from "./screens/ExperiencesScreen"; // Pantalla de experiencias

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Pantalla de Lista de Usuarios */}
        <Tab.Screen name="Usuarios" component={UsersScreen} />
        {/* Pantalla de Lista de Experiencias */}
        <Tab.Screen name="Experiencias" component={ExperiencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
