import { View, Text } from "react-native";
import React from "react";
import tw from "../lib/tailwind";

const Footer = () => {
    return (
        <View style={tw`py-8`}>
            <Text
                style={tw`font-medium text-grayscale-60 text-base text-center`}
            >
                Todos os direitos reservados à{" "}
            </Text>
            <Text
                style={tw`font-medium text-grayscale-60 text-base text-center`}
            >
                {" "}
                © Wastee. 2024 ©
            </Text>
        </View>
    );
};

export default Footer;
