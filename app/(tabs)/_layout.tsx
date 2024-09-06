import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              fill={focused ? "white" : ""}
              size={28}
              name="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="liked"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              fill={focused ? "white" : ""}
              size={24}
              name="heart"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              fill={focused ? "white" : ""}
              size={24}
              name="plus-circle"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              fill={focused ? "white" : ""}
              size={24}
              name="message-circle"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="perfil"  options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              fill={focused ? "white" : ""}
              size={24}
              name="user"
              color={color}
            />
          ),
        }} />
    </Tabs>
  );
}