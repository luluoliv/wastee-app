import React from "react";
import { View, Text } from "react-native";
import { getRandomColor } from "../utils/getRandomColor";
import tw from "../lib/tailwind";

interface AvatarProps {
    user?: string; 
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    const backgroundColor = getRandomColor();
    
    const initials = user
        ? user
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "??";

    return (
        <View style={[tw`w-14 h-14 rounded-full`, { backgroundColor }]}>
            <Text style={tw`p-2 font-medium text-center text-3xl text-grayscale-20`}>
                {initials}
            </Text>
        </View>
    );
};

export default Avatar;
