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
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/src/lib/tailwind";

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    icon?: keyof typeof FontAwesome.glyphMap;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    style,
    textStyle,
    loading,
    icon,
    disabled
}) => {
    return (
        <TouchableOpacity
            style={[tw`w-full bg-primary px-4 py-3 rounded-xl items-center flex-row justify-center`, style]}
            onPress={onPress}
            disabled={loading || disabled}
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
                    <FontAwesome
                        name={icon}
                        size={20}
                        color="#FFFFFF"
                        style={tw`mr-3`}
                    />
                )}
                <Text style={[tw`text-grayscale-100 text-base font-semibold`, textStyle]}>
                    {loading ? "Loading..." : title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Button;
