import React, { useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Header from "@/src/components/header";
import Dropdown from "@/src/components/dropdown";
import tw from "@/src/lib/tailwind";
import Footer from "@/src/components/footer";
import Avatar from "@/src/components/avatar";

const User = () => {
    const { user } = useLocalSearchParams<{ user: string }>();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isReport, setIsReport] = useState(false);

    const options = [
        {
            label: "Denunciar",
            icon: "alert-circle",
            action: () => setIsReport(!isReport),
        },
    ];
    return (
        <View style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <Header onMorePress={() => setDropdownVisible(!dropdownVisible)} />
            <Dropdown
                style={tw`top-4`}
                options={options}
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
            />

            <View style={tw`px-5 flex-row items-center gap-x-3`}>
                <Avatar user={user} />
                <View style={tw`flex flex-col`}>
                    <Text
                        style={tw`font-semibold text-xl text-left text-grayscale-100`}
                    >
                        {user}
                    </Text>
                    <Text
                        style={tw`font-semibold text-base text-left text-grayscale-100`}
                    >
                        Esse usuário não é um vendedor.
                    </Text>
                </View>
            </View>
            <Footer />
        </View>
    );
};

export default User;
