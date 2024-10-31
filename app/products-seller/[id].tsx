import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Header from "@/src/components/header";
import tw from "@/src/lib/tailwind";
import Item from "@/src/components/item";
import { getProductBySellerId, ProductResponse } from "@/src/service/productsService";

const ProductsSeller = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                setError(error.message || "Erro ao carregar produto.")
            } finally {
                setLoading(false);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchProductsBySeller()
    }, []);

    
    if (loading) {
        return (
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <ActivityIndicator size="large" color={"#fff"} />
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <Text style={tw`text-red-500`}>{error}</Text>
            </View>
        );
    }

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
