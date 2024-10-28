import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { LegacyRef, useEffect } from "react";
import tw from "../lib/tailwind";
import { Feather } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";

export interface InputTextProps {
    leftSideContent?: React.ReactNode;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onFocusNavigate?: boolean;
    focused?: boolean;
    setFocused?: (value: boolean) => void;
    ref?: LegacyRef<TextInput> | undefined
}

const InputText: React.FC<InputTextProps> = ({
    leftSideContent,
    placeholder,
    value = "",
    onChangeText = (text: string) => {},
    onFocusNavigate,
    focused = false,
    ref,
    setFocused = () => {},
}) => {
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (focused && onFocusNavigate && !segments.includes("search")) {
            setFocused(false);
            router.push("/search");
        }
    }, [focused, onFocusNavigate, segments]);

    return (
        <View style={tw`w-full flex-row items-center gap-x-2`}>
            <View
                style={tw`relative m-auto w-full h-12 bg-grayscale-40 flex flex-row items-center border rounded-xl px-4 py-3`}
            >
                {leftSideContent && (
                    <View style={tw`pr-2.5 justify-center`}>
                        {leftSideContent}
                    </View>
                )}

                {!focused && !value && (
                    <Text
                        style={tw.style(
                            "absolute left-12 text-grayscale-60 text-base bg-grayscale-40"
                        )}
                    >
                        {placeholder}
                    </Text>
                )}

                <TextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholderTextColor={tw.color("text-grayscale-60")}
                    textAlign="left"
                    style={tw`flex-1 w-full bg-transparent text-grayscale-100 text-base font-medium`}
                />
            </View>

            {value && value.length > 0 && (
                <TouchableOpacity
                    style={tw`absolute right-4 bg-grayscale-40`}
                    onPress={() => onChangeText?.("")}
                >
                    <Feather
                        name="x-circle"
                        size={20}
                        color={tw.color("text-grayscale-60")}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default InputText;
