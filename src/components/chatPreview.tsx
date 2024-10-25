import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import React, { useState } from "react";
import Avatar from "./avatar";
import tw from "../lib/tailwind";
import { Feather } from "@expo/vector-icons";
import { ChatResponse } from "../service/chatsService";
import Dropdown from "./dropdown";
import ModalReport from "./modalReport";
import { useRouter } from "expo-router";
import { useUser } from "../contexts/UserContext";

interface ChatPreviewProps {
    data: ChatResponse;
    handleDeleteChat: (id: string) => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
    data,
    handleDeleteChat,
}) => {
    const { user } = useUser();
    const router = useRouter();
    const [isReport, setIsReport] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const options = [
        {
            label: "Visitar vendedor",
            icon: "shopping-bag",
            action: () => router.push(`/seller/${data?.seller}`),
        },
        {
            label: "Excluir conversa",
            icon: "trash",
            action: () => handleDeleteChat(data.id),
        },
        {
            label: "Denunciar",
            icon: "alert-circle",
            action: () => setIsReport(!isReport),
        },
    ];

    return (
        <>
            {dropdownVisible && (
                <TouchableOpacity
                    style={tw`absolute inset-0 bg-transparent`}
                    onPress={() => setDropdownVisible(false)}
                    activeOpacity={1}
                />
            )}
            <ModalReport
                visible={isReport}
                onClose={() => setIsReport(false)}
            />
            <Dropdown
                style={tw`absolute top-4 z-50`}
                options={options}
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
            />
            <View style={tw`w-full gap-3 flex flex-row items-center`}>
                <Avatar user={data?.seller_name} />
                <View
                    style={tw`w-full flex-1 flex-row justify-between items-start`}
                >
                    <View style={tw`flex-col`}>
                        <Text
                            style={tw`text-base font-medium text-grayscale-100`}
                        >
                            {data.seller_name}
                        </Text>

                        {data.last_message?.sender_id === user?.id ? (
                            <>
                            <Text
                                style={tw`text-base font-medium text-grayscale-60`}
                                >
                                {data.last_message?.message}
                            </Text>
                            <Text
                            style={tw`font-semibold text-sm text-grayscale-60`}
                            >
                            {new Date(
                                data.last_message?.sent_at
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                            </>
                        ) : data.last_message ? (
                            <>
                                <Text
                                    style={tw`text-base font-medium text-grayscale-100`}
                                >
                                    {data.last_message?.message}
                                </Text>
                                <Text
                                    style={tw`font-semibold text-sm text-grayscale-60`}
                                >
                                    {new Date(
                                        data.last_message?.sent_at
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </>
                        ) : (
                            <Text
                                style={tw`text-base font-medium text-grayscale-60`}
                            >
                                Sem mensagens
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                    >
                        <Feather
                            name="more-horizontal"
                            size={24}
                            color={"#fbfcff"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default ChatPreview;
