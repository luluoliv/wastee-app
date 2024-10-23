import React, { useEffect, useState } from "react";
import tw from "@/src/lib/tailwind";

import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    ActivityIndicator, // Import ActivityIndicator for loading spinner
    TouchableOpacity,
} from "react-native";
import { Href, useRouter } from "expo-router";
import {
    ChatResponse,
    deleteChat,
    getAllChats,
} from "@/src/service/chatsService";
import InputText from "@/src/components/inputText";
import { Feather } from "@expo/vector-icons";

import { robot } from "@/src/utils/imports";
import ChatPreview from "@/src/components/chatPreview";

export default function Messages() {
    const router = useRouter();

    const [chats, setChats] = useState<ChatResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChats = async () => {
        try {
            const response = await getAllChats();
            setChats(response);
            console.log(response);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar produtos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const handleDeleteChat = async (id: string) => {
        try {
            await deleteChat(id);
            console.log("Conversa deletada com sucesso!");
            alert("Conversa deletada com sucesso!");
            fetchChats();
        } catch (error) {
            alert(error);
        }
    };

    const handleItemPress = (id: string) => {
        router.push(`/chat/${id}` as Href<`/password/${string}`>);
    };

    return (
        <View style={tw`w-full flex-1 pt-10 px-3 gap-y-4 bg-grayscale-20`}>
            <View style={tw`w-full flex-col gap-y-5`}>
                <InputText
                    leftSideContent={
                        <Feather
                            name="search"
                            size={20}
                            color={tw.color("text-grayscale-60")}
                        />
                    }
                    placeholder="Pesquisar conversa"
                />

                <Text
                    style={tw`text-xl font-medium text-grayscale-100 text-left`}
                >
                    Mensagens
                </Text>
            </View>

            <ScrollView contentContainerStyle={tw`w-full flex-1 gap-y-4`}>
                {loading ? (
                    <View
                        style={tw`w-full flex-1 items-center justify-center pt-12`}
                    >
                        <ActivityIndicator
                            size="large"
                            color={tw.color("text-grayscale-100")}
                        />
                        <Text style={tw`mt-2 text-lg text-grayscale-100`}>
                            Carregando mensagens...
                        </Text>
                    </View>
                ) : chats.length > 0 ? (
                    chats.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleItemPress(item.id)}
                        >
                            <ChatPreview
                                data={item}
                                handleDeleteChat={handleDeleteChat}
                            />
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={tw`w-full flex-1 pt-12 gap-y-4 items-center`}>
                        <Image source={robot} style={tw`w-32 h-32`} />
                        <Text
                            style={tw`text-xl font-medium text-grayscale-100 text-center`}
                        >
                            Nenhuma mensagem ainda
                        </Text>
                        <Text
                            style={tw`text-base font-medium text-grayscale-60 text-center`}
                        >
                            Você verá suas conversas com os vendedores aqui
                            assim que enviar sua primeira mensagem.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins_600SemiBold_Italic",
    },
});
