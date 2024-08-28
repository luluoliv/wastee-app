import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    icon?: keyof typeof FontAwesome.glyphMap;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    style,
    textStyle,
    loading,
    icon,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            disabled={loading}
        >
            <View style={styles.content}>
                {loading && (
                    <ActivityIndicator
                        size="small"
                        color="#FFFFFF"
                        style={styles.spinner}
                    />
                )}
                {icon && (
                    <FontAwesome
                        name={icon}
                        size={20}
                        color="#FFFFFF"
                        style={styles.icon}
                    />
                )}
                <Text style={[styles.text, textStyle]}>
                    {loading ? "Loading..." : title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#3573FB",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontFamily: "Poppins_500Medium",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    spinner: {
        marginRight: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default Button;
