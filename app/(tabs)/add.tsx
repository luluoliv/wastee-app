import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import tw from "@/src/lib/tailwind";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useRouter } from "expo-router";
import { cart, robot } from "@/src/utils/imports";
import { useUser } from "@/src/contexts/UserContext";
import Button from "@/src/components/button";

export default function Add() {
    const router = useRouter();
    const { user } = useUser();

    return (
        <View style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <View
                style={tw`flex-row items-center justify-end p-4 bg-grayscale-20`}
            >
                <TouchableOpacity>
                    <FontAwesome
                        name={"question-circle-o"}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            {user?.user_type === "seller" ? (
                <View
                    style={tw`flex-1 justify-center items-center px-5 gap-y-4`}
                >
                    <Image source={robot} style={tw`w-32 h-32`} />
                    <Text
                        style={tw`font-medium text-xl text-center text-grayscale-100`}
                    >
                        Bem-vindo, vendedor!
                    </Text>
                    <Text
                        style={tw`font-medium text-base text-center text-grayscale-60`}
                    >
                        Comece a gerenciar seus produtos e acompanhar suas
                        vendas.
                    </Text>
                    <Button
                        onPress={() => router.push("/perfil")}
                        icon="package"
                        title="Meus Produtos"
                        style={tw`bg-grayscale-100`}
                        textStyle={tw`text-grayscale-20`}
                    />
                </View>
            ) : (
                <View
                    style={tw`flex-1 justify-center items-center px-5 gap-y-4`}
                >
                    <Image source={cart} style={tw`w-32 h-32`} />
                    <Text
                        style={tw`font-medium text-xl text-center text-grayscale-100`}
                    >
                        Você ainda não é um vendedor.
                    </Text>
                    <Text
                        style={tw`font-medium text-base text-center text-grayscale-60`}
                    >
                        Torne-se um vendedor para começar a vender seus
                        produtos.
                    </Text>
                    <Button
                        onPress={() => router.push("/sell-forms")}
                        icon="user-plus"
                        title="Quero me tornar um vendedor"
                        style={tw`bg-grayscale-100`}
                        textStyle={tw`text-grayscale-20`}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins_600SemiBold_Italic",
    },
});
