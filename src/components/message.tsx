import { View, Text } from "react-native";

import { MessageResponse } from "../service/chatsService";
import React from "react";
import tw from "../lib/tailwind";
import { formatDateMessage } from "../utils/formatDateMessage";
import { useUser } from "../contexts/UserContext";

export interface MessageProps {
    message: MessageResponse;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const {user} = useUser()

    const isYourself = user?.id === message?.sender
    return (
        <View key={message.id} style={tw`${isYourself ? 'bg-primary': 'bg-grayscale-40'} flex-col px-5 py-3 rounded-xl max-w-3/4 self-start ${isYourself ? 'self-end': 'self-start'}`}>
            <Text style={tw`text-base font-medium text-grayscale-100`}>
                {message.message}
            </Text>
            <Text style={tw`text-xs text-left font-medium text-grayscale-80`}>
                {formatDateMessage(message.sent_at)}
            </Text>
        </View>
    );
};

export default Message;
