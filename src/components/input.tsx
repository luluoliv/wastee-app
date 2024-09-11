import React, { FC, useState, forwardRef, Ref } from "react";
import {
    TextInput,
    View,
    Text,
    TextInputProps,
    LayoutChangeEvent,
    StyleSheet,
} from "react-native";
import tw from "twrnc";
import {
    useController,
    UseControllerProps,
    FieldError,
    Control,
} from "react-hook-form";
import { COLORS } from "../utils/Colors";

export interface InputProps
    extends Omit<TextInputProps, "defaultValue">,
        UseControllerProps {
    name: string;
    label: string;
    leftSideContent?: React.ReactNode;
    defaultValue?: string;
    rightSideContent?: React.ReactNode;
    error?: FieldError;
    control: Control<any>;
}

const Input: FC<InputProps> = forwardRef(
    (
        { leftSideContent, rightSideContent, error, label, control, ...props },
        ref: Ref<TextInput>
    ) => {
        const [focused, setFocused] = useState(false);
        const [inputHeight, setInputHeight] = useState(0);

        const { name, rules, defaultValue } = props;
        const { field } = useController({ name, control, rules, defaultValue });

        const handleFocus = () => {
            setFocused(true);
        };

        const handleBlur = () => {
            setFocused(false);
            field.onBlur();
        };

        const measureInput = (e: LayoutChangeEvent) => {
            const height = e.nativeEvent.layout.height;
            if (inputHeight !== height) {
                setInputHeight(e.nativeEvent.layout.height);
            }
        };

        const errorMessage = typeof error === "string" ? error : error?.message;

        const borderColor =
            focused && !error
                ? COLORS.primary.DEFAULT
                : !!error
                ? COLORS.red.DEFAULT
                : COLORS.grayscale[60];

        const placeholderColor = COLORS.grayscale[60];
        const textColor = COLORS.grayscale[100];

        return (
            <>
                <View
                    style={[
                        tw`w-full flex flex-row items-center border rounded-lg p-2.5`,
                        { borderColor },
                    ]}
                >
                    {leftSideContent ? (
                        <View style={tw`pr-2.5 justify-center text-sm`}>
                            {leftSideContent}
                        </View>
                    ) : null}
                    <TextInput
                        {...props}
                        ref={ref}
                        onLayout={measureInput}
                        onChangeText={field.onChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        style={[
                            tw`w-full bg-transparent`,
                            { color: textColor },
                        ]}
                        placeholderTextColor={placeholderColor}
                        value={field.value}
                    />
                    {rightSideContent ? (
                        <View style={tw`pl-2 justify-center text-sm`}>
                            {rightSideContent}
                        </View>
                    ) : null}
                </View>
                {errorMessage ? (
                    <Text
                        style={tw`text-red-600 text-base self-center pt-2 font-light`}
                    >
                        {errorMessage}
                    </Text>
                ) : null}
            </>
        );
    }
);

export default Input;
