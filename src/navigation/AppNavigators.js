import { View, Text } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "../screens/Splash";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
// import Main from "../screens/Main";
import Users from "../screens/Users";
import Settings from "../screens/Settings";
import Chat from "../screens/Chat";
import { Ionicons, Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const [activeTab, setActiveTab] = useState("User");

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#b831b8", height: 60 },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 18, fontWeight: "bold" },
        tabBarIcon: ({ color }) => {
          if (route.name === "User") {
            return (
              <Entypo
                name="user"
                size={24}
                color={activeTab === "User" ? "white" : "black"}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name="settings"
                size={24}
                color={activeTab === "Settings" ? "white" : "black"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="User"
        component={Users}
        options={{
          headerShown: false,
        }}
        listeners={{
          tabPress: () => handleTabPress("User"),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
        listeners={{
          tabPress: () => handleTabPress("Settings"),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigators;
