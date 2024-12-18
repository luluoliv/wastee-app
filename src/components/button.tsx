import React from "react";
import {
    TouchableOpacity,
    Text, ActivityIndicator,
    View,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    TextStyle
} from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "@/src/lib/tailwind";

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    icon?: keyof typeof Feather.glyphMap;
    iconColor?: string,
    disabled?: boolean;
    delayPressIn?: number;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    style,
    textStyle,
    loading,
    icon,
    iconColor,
    disabled,
    delayPressIn,
    onPressIn,
}) => {
    return (
        <TouchableOpacity
            style={[tw`w-full bg-primary disabled:bg-grayscale-60 px-4 py-3 rounded-xl items-center flex-row justify-center`, style]}
            onPress={onPress}
            onPressIn={onPressIn}
            disabled={loading || disabled}
            delayPressIn={delayPressIn}
        > 
            <View style={tw`flex-row items-center`}>
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color="#FFFFFF"
                        style={tw`mr-3`}
                    />
                )}
                {icon && (
                    <Feather
                        name={icon}
                        size={20}
                        color={iconColor}
                        style={tw`mr-3`}
                    />
                )}
                <Text style={[tw`text-grayscale-100 text-base font-semibold`, textStyle]}>
                    {loading ? "Carregando..." : title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
