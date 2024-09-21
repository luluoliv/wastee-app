import React, { useEffect, useRef } from "react";
import {
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
    StyleProp,
    ViewStyle
} from "react-native";
import tw from "../lib/tailwind";
import { Feather } from "@expo/vector-icons";

interface DropdownOption {
    label: string;
    action?: () => void;
    icon: keyof typeof Feather.glyphMap | string | null | undefined;
}

interface DropdownProps {
    visible: boolean;
    onClose: () => void;
    options: DropdownOption[];
    style?: StyleProp<ViewStyle>
}

const Dropdown: React.FC<DropdownProps> = ({ visible, onClose, options, style }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start();
        }
    }, [visible, fadeAnim]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                tw`absolute z-10 top-24 right-4 w-48 bg-grayscale-20 rounded-xl shadow-lg`,
                { opacity: fadeAnim }, style
            ]}
        >
            <ScrollView>
                {options.map((option, index) => {
                    const isLastOption = index === options.length - 1;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={tw`py-2 px-3 rounded-md bg-grayscale-20 flex-row items-center gap-x-2`}
                            onPress={() => {
                                if (option.action) {
                                    option.action();
                                }
                                onClose();
                            }}
                        >
                            <Feather
                                name={
                                    isLastOption ? "alert-circle" : option.icon
                                }
                                size={16}
                                color={isLastOption ? "#EF4444" : "white"}
                            />
                            <Text
                                style={tw`font-medium ${
                                    isLastOption
                                        ? "text-primary-dark"
                                        : "text-grayscale-100"
                                } text-base`}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
};

export default Dropdown;
