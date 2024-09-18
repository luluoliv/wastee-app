import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import tw from "@/src/lib/tailwind";

import Item from "@/src/components/item";
import { items } from "@/src/components/items";

export default function Home() {
    const router = useRouter();
    const { control } = useForm();

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    return (
        <View style={tw`w-full flex-1 pt-10 bg-grayscale-20`}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                        <Item data={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={tw`p-4`}
                columnWrapperStyle={tw`justify-between mb-4`}
                numColumns={2}
            />
        </View>
    );
}
