import React from "react";
import {
    View,
    Text,
    Modal as RNModal,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import tw from "../lib/tailwind";
import { Feather } from "@expo/vector-icons";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
}

const screenHeight = Dimensions.get("window").height;

const Modal: React.FC<ModalProps> = ({
    visible,
    onClose,
    title,
    subtitle,
    children,
}) => {
    return (
        <RNModal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
                <View
                    style={[
                        tw`w-full bg-grayscale-20 rounded-t-[20px] p-5`,
                        { maxHeight: screenHeight * 0.75 },
                    ]}
                >
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-col`}>
                            {title && (
                                <Text
                                    style={tw`font-semibold text-xl text-grayscale-100 max-w-xs`}
                                >
                                    {title}
                                </Text>
                            )}
                            {subtitle && (
                                <Text
                                    style={tw`font-medium text-base text-grayscale-60 max-w-xs`}
                                >
                                    {subtitle}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            style={tw`bg-grayscale-60 rounded-full p-1`}
                            onPress={onClose}
                        >
                            <Feather
                                name="x"
                                size={20}
                                style={tw`text-grayscale-20`}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={tw`mt-3`}>{children}</ScrollView>
                </View>
            </View>
        </RNModal>
    );
};

export default Modal;
