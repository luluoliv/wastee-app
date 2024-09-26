import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import tw from "../lib/tailwind";

interface SearchHistoricProps {
    search: string;
}

const SearchHistoric: React.FC<SearchHistoricProps> = ({ search }) => {
    const [showSearchHistoric, setShowSearchHistoric] = useState(true);

    if (!showSearchHistoric) {
        return null;
    }

    return (
        <View style={tw`w-full flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center gap-x-3`}>
                <View style={tw`border border-grayscale-40 rounded-xl p-2`}>
                    <Feather name="search" size={20} color="#787f8d" />
                </View>
                <Text style={tw`font-medium text-base text-grayscale-100`}>
                    {search}
                </Text>
            </View>
            <TouchableOpacity onPress={() => setShowSearchHistoric(false)}>
                <Feather name="x-circle" size={24} color="#787f8d" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchHistoric;
