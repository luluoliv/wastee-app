import React from "react";
import tw from "@/src/lib/tailwind";

import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


const robot = require("../../assets/images/robot.png");

export default function Perfil() {
    const router = useRouter();

    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
            <View style={tw`flex-1 justify-center items-center gap-y-12`}>
                <Image source={robot} style={tw`w-32 h-32`} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins_600SemiBold_Italic",
    },
});
