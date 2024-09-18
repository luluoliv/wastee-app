import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
    title: string | null | undefined;
    onMorePress?: () => void; 
    moreIconName?: keyof typeof Feather.glyphMap;
}

const Header: React.FC<HeaderProps> = ({ title, onMorePress, moreIconName = "more-horizontal" }) => {
    const router = useRouter();

    return (
        <View style={tw`flex-row items-center justify-between p-4 bg-grayscale-20`}>
            <TouchableOpacity onPress={() => router.back()}>
                <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={tw`text-primary text-lg font-bold`}>{title}</Text>
            <TouchableOpacity onPress={onMorePress}>
                <Feather name={moreIconName} size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
