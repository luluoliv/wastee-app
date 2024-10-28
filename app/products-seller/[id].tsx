import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Header from "@/src/components/header";
import tw from "@/src/lib/tailwind";
import { sellers } from "@/src/data/sellers";
import { items } from "@/src/data/items";
import Item from "@/src/components/item";
import { getProductBySellerId, ProductResponse } from "@/src/service/productsService";

const ProductsSeller = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    const fetchProductsBySeller = async () => {
        try {
            setLoading(true);
            try {
                const response = await getProductBySellerId(id);
                setProducts(response);
            } catch (error: any) {
                Alert.alert(error.message || "Erro ao carregar produto.");
            } finally {
                setLoading(false);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchProductsBySeller()
    }, []);

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
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                        <Item fetchProduct={fetchProductsBySeller} data={item} likable={true} />
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
