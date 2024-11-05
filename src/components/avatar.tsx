import React from "react";
import { View, Text } from "react-native";
import { getRandomColor } from "../utils/getRandomColor";
import tw from "../lib/tailwind";

interface AvatarProps {
    user?: string;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 56 }) => {
    const backgroundColor = getRandomColor();
    const fontSize = size * 0.45; 
    const padding = size * 0.15;

    const initials = user
        ? user
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "??";

    return (
        <View
            style={[
                tw`rounded-full justify-center items-center`,
                {
                    backgroundColor,
                    width: size,
                    height: size,
                },
            ]}
        >
            <Text
                style={{
                    fontSize,
                    padding,
                    color: tw.color("text-grayscale-20"),
                    fontWeight: "500",
                    textAlign: "center",
                }}
            >
                {initials}
            </Text>
        </View>
    );
};

export default Avatar;
