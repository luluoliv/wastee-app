import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function SplashScreen() {
  return (
      <View className="flex-1 justify-center items-center bg-blue-500">
        <Image
          source={require('../assets/images/favicon.png')} 
          className="w-24 h-24"
        />
      </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});
