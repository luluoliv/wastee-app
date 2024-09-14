import React from "react";
import tw from "@/src/lib/tailwind";

import { View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/src/components/button";
import { blurBottom, blurTop, robot } from "@/src/utils/imports";

export default function Initial() {
    const router = useRouter();

    return (
        <View style={tw`flex-1 justify-center items-center bg-grayscale-20`}>
             <Image source={blurTop} style={tw`absolute top-0 left-0 right-0 h-1/4`} resizeMode="cover" />
             <Image source={blurBottom} style={tw`absolute bottom-0 left-0 right-0 h-1/4`} resizeMode="cover" />
            <View style={tw`flex-1 justify-center items-center gap-y-12`}>
                <Image source={robot} style={tw`w-32 h-32`} />
                <Text style={tw`text-primary text-5xl font-bold italic`}>Wastee</Text>
            </View>
            <View style={tw`w-full flex-col justify-center gap-y-2 p-4`}>
                <Button
                    onPress={() => router.push("/login")}
                    title="Vamos começar"
                />
                <Text style={tw`text-sm font-medium text-center text-grayscale-100`}>
                    Ao entrar, você concorda com nossos{" "}
                    <Text style={tw`text-primary`}>Termos de Serviço</Text> e <Text style={tw`text-primary`}>Política de Privacidade</Text>.
                </Text>
            </View>
        </View>
    );
}

