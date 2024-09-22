import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import tw from "@/src/lib/tailwind";

import { items } from "@/src/data/items";
import Item from "@/src/components/item";
import InputText from "@/src/components/inputText";

export default function Home() {
    const router = useRouter();

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    return (
        <View style={tw`w-full flex-1 pt-10 px-3 gap-y-4 bg-grayscale-20`}>
            <InputText
                placeholder="Pesquisar"
                leftSideContent={
                    <Feather
                        name="search"
                        size={20}
                        color={tw.color("text-grayscale-60")}
                    />
                }
                onFocusNavigate
            />
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                        <Item data={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={tw`justify-between mb-4`}
                numColumns={2}
            />
        </View>
    );
}
