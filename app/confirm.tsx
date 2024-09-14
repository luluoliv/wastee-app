import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import tw from "@/src/lib/tailwind";
import { blurBottom } from "@/src/utils/imports";

const Confirm = () => {
    return (
        <View style={tw`flex-1 pt-20 gap-y-20 bg-grayscale-20`}>
            <Image
                source={blurBottom}
                style={tw`absolute bottom-0 left-0 right-0 h-1/4`}
                resizeMode="cover"
            />

            <Text
                style={tw`text-center text-primary text-3xl font-bold italic`}
            >
                Wastee
            </Text>

            <View
                style={tw`flex-1 w-full px-2 flex flex-col items-center gap-y-4`}
            >
                <Text
                    style={tw`text-xl text-center font-medium text-grayscale-100`}
                >
                    Confirme seu e-mail.
                </Text>
                <Text
                    style={tw`text-base text-center font-normal text-grayscale-100`}
                >
                    Insira o código enviado para{" "}
                    <Text
                        style={tw`text-base text-center font-semibold text-grayscale-100`}
                    >
                        luara.lima@gmail.com
                    </Text>
                </Text>
                <View
                    style={tw`flex-row justify-between w-full px-4 items-center gap-y-4`}
                >
                    <Text
                        style={tw`text-sm text-center font-medium text-grayscale-100`}
                    >
                        luara.lima@gmail.com
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={tw`text-sm text-center font-medium text-primary`}
                        >
                            Alterar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Confirm;
