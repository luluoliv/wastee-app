import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import tw from "@/src/lib/tailwind";

import { getAllProducts, ProductResponse } from "@/src/service/productsService";
import Item from "@/src/components/item";
import InputText from "@/src/components/inputText";

export default function Home() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response);
            } catch (err: any) {
                setError(err.message || "Erro ao carregar produtos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-grayscale-20`}>
                <ActivityIndicator size="large" color={"#fff"} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-red-500`}>{error}</Text>
            </View>
        );
    }

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
                data={products}
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
