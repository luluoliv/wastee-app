import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import tw from "@/src/lib/tailwind";
import Header from "@/src/components/header";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ChatResponse,
    deleteChat,
    getChatById,
} from "@/src/service/chatsService";
import ModalReport from "@/src/components/modalReport";
import Dropdown from "@/src/components/dropdown";
import { Feather } from "@expo/vector-icons";
import InputChat from "@/src/components/inputChat";

const Chat = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const [chat, setChat] = useState<ChatResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isReport, setIsReport] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    const fetchChat = async () => {
        try {
            const response = await getChatById(id);            
            setChat(response);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar a conversa.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChat();
    }, []);

    const handleDeleteChat = async (id: string | undefined) => {
        try {
            await deleteChat(id);
            Alert.alert("Conversa deletada com sucesso!");
            router.back()
            fetchChat();
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const options = [
        {
            label: "Excluir conversa",
            icon: "trash",
            action: () => handleDeleteChat(chat?.id),
        },
        {
            label: "Denunciar",
            icon: "alert-circle",
            action: () => setIsReport(!isReport),
        },
    ];

    return (
        <View style={tw`flex-1 py-10 bg-grayscale-20`}>
            <Header
                titleStyle={tw`text-grayscale-100`}
                title={chat?.seller_name || "Carregando..."}
                moreIconName="more-horizontal"
                onMorePress={() => setDropdownVisible(!dropdownVisible)}
            />

            {loading ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator
                        size="large"
                        color={tw.color("text-grayscale-100")}
                    />
                    <Text style={tw`mt-2 text-lg text-grayscale-100`}>
                        Carregando conversa...
                    </Text>
                </View>
            ) : (
                <>
                    <ModalReport
                        visible={isReport}
                        onClose={() => setIsReport(false)}
                    />

                    <Dropdown
                        options={options}
                        visible={dropdownVisible}
                        onClose={() => setDropdownVisible(false)}
                    />
                    <KeyboardAwareScrollView
                        contentContainerStyle={tw`flex-grow`}
                    >
                        <View style={tw`flex-1 p-5 gap-3`}>
                            <View style={tw`flex-row gap-x-3 px-3`}>
                                <Feather
                                    name="info"
                                    size={24}
                                    color={"#787f8d"}
                                />
                                <Text
                                    style={tw`text-base font-medium text-grayscale-60`}
                                >
                                    Use sempre os canais do Wastee e não
                                    compartilhe seus dados pessoais diretamente
                                    com ninguém.
                                </Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View
                            style={tw`py-3 px-5 gap-x-3 flex-row justify-center items-center`}
                        >
                            <InputChat placeholder="Digite sua mensagem" />
                            <TouchableOpacity
                                style={tw`bg-grayscale-100 rounded-full p-3`}
                                onPress={() => {}}
                            >
                                <Feather
                                    name="send"
                                    size={20}
                                    color={"#0c0c11"}
                                />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </>
            )}
        </View>
    );
};

export default Chat;
