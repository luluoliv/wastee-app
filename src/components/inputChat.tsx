import { TextInput } from "react-native";
import React, { useState } from "react";
import tw from "../lib/tailwind";

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
        if (inputValue.trim() && onSend) {
            onSend(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={handleSend}
            placeholder={placeholder}
            placeholderTextColor={tw.color("text-grayscale-60")}
            style={tw`flex-1 bg-transparent text-grayscale-100 text-base font-medium rounded-xl border border-grayscale-60 px-4 py-2`}
            textAlignVertical="center"
        />
    );
};

export default InputChat;
