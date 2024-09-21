import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Header from "@/src/components/header";
import tw from "@/src/lib/tailwind";
import { sellers } from "@/src/components/sellers";
import { items } from "@/src/components/items";
import Item from "@/src/components/item";

const ProductsSeller = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const seller = sellers.find((seller) => id == seller.id);
    const products = items.filter((item) => item?.seller === id);

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    return (
        <View style={tw`flex-1 py-10 bg-grayscale-20`}>
            <Header moreIconName="" />
                <View style={tw`px-4 flex-row items-center justify-between`}>
                    <Text style={tw`font-medium text-xl text-grayscale-100`}>
                        Produtos ({products.length})
                    </Text>
                    <Text style={tw`font-medium text-xl text-grayscale-60`}>
                        Mais recentes
                    </Text>
                </View>
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleItemPress(item.id)}
                        >
                            <Item data={item} likable={true} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={tw`p-4`}
                    columnWrapperStyle={tw`justify-between mb-4`}
                    numColumns={2}
                />
        </View>
    );
};

export default ProductsSeller;
