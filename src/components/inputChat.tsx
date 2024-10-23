import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";
import { Feather } from "@expo/vector-icons";

export interface InputChatProps {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onSend?: (text: string) => void;
}

const InputChat: React.FC<InputChatProps> = ({
    placeholder,
    value,
    onChangeText,
    onSend,
}) => {
    const [inputValue, setInputValue] = useState(value || "");

    const handleSend = () => {
        if (inputValue.trim()) {
            onSend?.(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <View
            style={tw`flex flex-row items-center border border-grayscale-60 rounded-xl px-4 py-3`}
        >
            <TextInput
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text);
                    if (onChangeText) onChangeText(text);
                }}
                placeholder={placeholder}
                placeholderTextColor={tw.color("text-grayscale-60")}
                style={tw`flex-1 w-full bg-transparent text-grayscale-100 text-base font-medium`}
            />
        </View>
    );
};

export default InputChat;
