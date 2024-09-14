import React, { FC } from "react";
import { View, Text as RNText, TextProps } from "react-native";
import tw from "@/src/lib/tailwind";
import { FieldError } from "react-hook-form";

export interface TextComponentProps extends TextProps {
    label?: string;
    leftSideContent?: React.ReactNode;
    rightSideContent?: React.ReactNode;
    error?: FieldError;
}

const TextComponent: FC<TextComponentProps> = ({
    label,
    leftSideContent,
    rightSideContent,
    error,
    style,
    ...props
}) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
        <>
            <View style={tw`w-full flex flex-row items-center p-2.5`}>
                {leftSideContent ? (
                    <View style={tw`pr-2.5 justify-center`}>
                        {leftSideContent}
                    </View>
                ) : null}
                <RNText
                    {...props}
                    style={[tw`text-base`, error && tw`text-red-600`, style]}
                >
                    {label}
                </RNText>
                {rightSideContent ? (
                    <View style={tw`pl-2 justify-center`}>
                        {rightSideContent}
                    </View>
                ) : null}
            </View>
            {errorMessage ? (
                <RNText
                    style={tw`text-red-600 text-base self-center pt-2 font-light`}
                >
                    {errorMessage}
                </RNText>
            ) : null}
        </>
    );
};

export default TextComponent;
