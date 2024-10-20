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
        <Tab.Screen name="Usuarios" component={UsersScreen} />
        <Tab.Screen name="Experiencias" component={ExperiencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
