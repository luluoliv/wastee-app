import React, { FC, useState, forwardRef, Ref } from "react";
import {
    TextInput,
    View,
    Text,
    TextInputProps,
    LayoutChangeEvent,
    Animated,
    TouchableOpacity,
} from "react-native";
import tw from "@/src/lib/tailwind";
import {
    useController,
    UseControllerProps,
    FieldError,
    Control,
    FieldErrorsImpl,
    Merge,
} from "react-hook-form";
import { Feather } from "@expo/vector-icons";

export interface InputProps
    extends Omit<TextInputProps, "defaultValue">,
        UseControllerProps {
    name: string;
    label: string;
    leftSideContent?: React.ReactNode;
    defaultValue?: string;
    rightSideContent?: React.ReactNode;
    error?:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined;
    control: Control<any>;
}

const Input: FC<InputProps> = forwardRef(
    (
        { leftSideContent, rightSideContent, error, label, control, ...props },
        ref: Ref<TextInput>
    ) => {
        const [focused, setFocused] = useState(false);
        const [inputHeight, setInputHeight] = useState(0);
        const [labelPosition] = useState(new Animated.Value(0));
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const { name, rules, defaultValue, secureTextEntry } = props;
        const { field } = useController({ name, control, rules, defaultValue });

        const handleFocus = () => {
            setFocused(true);
            Animated.timing(labelPosition, {
                toValue: -25,
                duration: 200,
                useNativeDriver: true,
            }).start();
        };

        const handleBlur = () => {
            setFocused(false);
            field.onBlur();
            if (!field.value) {
                Animated.timing(labelPosition, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        };

        const measureInput = (e: LayoutChangeEvent) => {
            const height = e.nativeEvent.layout.height;
            if (inputHeight !== height) {
                setInputHeight(e.nativeEvent.layout.height);
            }
        };

        const errorMessage =
            typeof error === "string"
                ? error
                : error && "message" in error
                ? error.message
                : "";

        return (
            <View style={tw`w-full`}>
                <View
                    style={tw.style(
                        "w-full flex flex-row items-center border rounded-lg p-4",
                        focused && !error
                            ? "border-primary"
                            : error
                            ? "border-red-500"
                            : "border-grayscale-60"
                    )}
                >
                    {leftSideContent ? (
                        <View style={tw`pr-2.5 justify-center text-sm`}>
                            {leftSideContent}
                        </View>
                    ) : null}
                    <Animated.Text
                        style={tw.style(
                            "absolute left-3 text-grayscale-60",
                            {
                                transform: [
                                    {
                                        translateY: labelPosition,
                                    },
                                ],
                            },
                            focused || field.value
                                ? "text-primary text-sm bg-grayscale-20"
                                : error
                                ? "text-red-500 text-sm bg-grayscale-20"
                                : "text-grayscale-60 text-base"
                        )}
                    >
                        {label}
                    </Animated.Text>

                    <TextInput
                        {...props}
                        ref={ref}
                        onLayout={measureInput}
                        onChangeText={field.onChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        style={tw`w-full bg-transparent text-grayscale-100`}
                        value={field.value}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                    />
                    {rightSideContent || secureTextEntry ? (
                        <View
                            style={tw`absolute right-3`}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    setIsPasswordVisible((prev) => !prev)
                                }
                            >
                                <Feather
                                    name={isPasswordVisible ? "eye" : "eye-off"}
                                    size={20}
                                    color={tw.color("text-grayscale-60")}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
                {errorMessage ? (
                    <Text style={tw`text-red-600 text-xs pt-2 font-light`}>
                        {errorMessage}
                    </Text>
                ) : null}
            </View>
        );
    }
);

export default Input;
