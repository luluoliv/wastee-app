import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import tw from "@/src/lib/tailwind";
import { categories } from "@/src/data/categories";
import { items } from "@/src/data/items";
import Item from "@/src/components/item";
import Header from "@/src/components/header";

const Category = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const category = categories.find((category) => category?.id === id);
    const filteredItems = items.filter((item) => item.category === category?.id);

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    return (
        <View style={tw`flex-1 py-10 px-3 bg-grayscale-20`}>
            <Header title={category?.name} moreIconName="share-2" />
            <Text style={tw`text-xl font-medium text-grayscale-60 text-right`}>
                Mais recentes
            </Text>

            <FlatList
                data={filteredItems}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                        <Item data={item} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={tw`text-center pt-10 text-grayscale-60`}>
                        Nenhum item encontrado.
                    </Text>
                }
                keyExtractor={(item) => item.id}
                columnWrapperStyle={tw`justify-between mb-4`}
                numColumns={2}
            />
        </View>
    );
};

export default Category;
