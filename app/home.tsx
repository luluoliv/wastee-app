import React from "react";
import tw from "twrnc";

import { View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/src/components/button";
import Title from "@/src/components/title";

const robot = require("../assets/images/robot.png");

export default function Home() {
    const router = useRouter();

    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
            <View style={tw`flex-1 justify-center items-center gap-y-12`}>
                <Image source={robot} style={tw`w-32 h-32`} />
                <Title/>
            </View>
            <View style={tw`w-full flex-col justify-center gap-y-2 p-4`}>
                <Button
                    onPress={() => router.push("/home")}
                    title="Vamos começar"
                />
                <Text style={tw`text-center text-white`}>
                    Ao entrar, você concorda com nossos{" "}
                    <Text style={tw`text-blue-500`}>Termos de Serviço</Text> e <Text style={tw`text-blue-500`}>Política de Privacidade</Text>.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins_600SemiBold_Italic",
    },
});
