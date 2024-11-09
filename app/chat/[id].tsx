import React, { useEffect, useState } from "react";
import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import tw from "@/src/lib/tailwind";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ChatResponse,
    createMessage,
    deleteChat,
    getChatById,
} from "@/src/service/chatsService";
import Header from "@/src/components/header";
import ModalReport from "@/src/components/modalReport";
import Dropdown from "@/src/components/dropdown";
import InputChat from "@/src/components/inputChat";
import { useUser } from "@/src/contexts/UserContext";
import { formatDate } from "@/src/utils/formatDate";
import Message from "@/src/components/message";
import Avatar from "@/src/components/avatar";
import { groupMessagesByDate } from "@/src/utils/groupMessagesByDate ";

const Chat = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { user } = useUser();
    const router = useRouter();

    const [chat, setChat] = useState<ChatResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSendMessage, setLoadingSendMessage] =
        useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isReport, setIsReport] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [inputValue, setInputValue] = useState<string>("");

    const fetchChat = async () => {
        setLoading(true);
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
            router.back();
            fetchChat();
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;
        setLoadingSendMessage(true);
        try {
            await createMessage({
                chat: chat?.id,
                sender: user?.id,
                message,
            });
            setInputValue("");
            fetchChat();
        } catch (error: any) {
            Alert.alert(error.message);
        } finally {
            setLoadingSendMessage(false);
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

    const groupedMessages = chat ? groupMessagesByDate(chat.messages) : [];

    return (
        <View style={tw`flex-1 py-10 bg-grayscale-20`}>
            <Header
                titleStyle={tw`text-grayscale-100`}
                title={chat?.seller_name || "Carregando..."}
                moreIconName="more-horizontal"
                onMorePress={() => setDropdownVisible(!dropdownVisible)}
            />

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
                contentContainerStyle={tw`flex-grow gap-y-3 p-5`}
            >
                <View style={tw`flex-1 gap-3`}>
                    <View style={tw`flex-row gap-x-3 px-3`}>
                        <Feather name="info" size={24} color={"#787f8d"} />
                        <Text
                            style={tw`text-base font-medium text-grayscale-60`}
                        >
                            Use sempre os canais do Wastee e não compartilhe
                            seus dados pessoais diretamente com ninguém.
                        </Text>
                    </View>
                </View>

                <View style={tw`flex-1 flex-row gap-x-2`}>
                    <View style={tw`flex-1 flex-col gap-y-2`}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#000" />
                        ) : (
                            groupedMessages.map((message, index) => (
                                <View key={index} style={tw`gap-y-3`}>
                                    <Text
                                        style={tw`text-center text-sm text-grayscale-60 my-2`}
                                    >
                                        {message.date}
                                    </Text>
                                    {message.messages.map((message, index) => (
                                        <Message
                                            key={index}
                                            message={message}
                                        />
                                    ))}
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View
                    style={tw`pt-3 pb-5 px-2 gap-x-3 flex-row justify-center items-center`}
                >
                    <InputChat
                        placeholder="Digite sua mensagem"
                        onSend={sendMessage}
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <TouchableOpacity
                        style={tw`bg-grayscale-100 rounded-full p-3`}
                        onPress={() => sendMessage(inputValue)}
                        disabled={loadingSendMessage}
                    >
                        {loadingSendMessage ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <Feather name="send" size={20} color={"#0c0c11"} />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Chat;
