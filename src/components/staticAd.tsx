import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import tw from "@/src/lib/tailwind";

const StaticAd = ({ image, title, url }: { image: string; title?: string; url: string }) => {
    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(url)}
            style={tw`w-full rounded-lg bg-grayscale-20 p-4 mb-4 shadow-md`}
        >
            <Image
                source={{ uri: image }}
                style={tw`w-full h-40 rounded-lg mb-2`}
                resizeMode="cover"
            />
            <Text style={tw`text-lg font-medium text-grayscale-80`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default StaticAd;
