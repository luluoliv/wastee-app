import { View, Text, StyleSheet } from "react-native";
import React from "react";
import tw from "twrnc";

const Title = () => {
  return (
    <View>
      <Text style={[tw`text-blue-500 text-4xl`, styles.text]}>Wastee</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_600SemiBold_Italic",
  },
});

export default Title;
