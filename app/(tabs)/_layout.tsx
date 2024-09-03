import React from "react";
import { Tabs } from "expo-router";
import { Home, ThumbsUp, Plus, MessageCircle, User } from "lucide-react";

export default function Navbar() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;

          switch (route.name) {
            case "home":
              IconComponent = Home;
              break;
            case "liked":
              IconComponent = ThumbsUp;
              break;
            case "add":
              IconComponent = Plus;
              break;
            case "messages":
              IconComponent = MessageCircle;
              break;
            case "perfil":
              IconComponent = User;
              break;
            default:
              IconComponent = null;
              break;
          }

          return IconComponent ? (
            <IconComponent
              fill={focused ? "white" : null}
              color={color}
              size={size}
            />
          ) : null;
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="liked" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}
