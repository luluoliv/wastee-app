import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

import tw from "@/src/lib/tailwind";

import InputText from "@/src/components/inputText";
import Item from "@/src/components/item";

import { FavoriteResponse, getFavorites } from "@/src/service/favoriteService";

import { sadRobot } from "@/src/utils/imports";
import { ProductResponse } from "@/src/service/productsService";

export default function Liked() {
    const router = useRouter();

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<ProductResponse[]>([]);

    const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
        []
    );
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await getFavorites();

            setFavorites(response);
            setFilteredProducts(response);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar comentários.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const results = favorites.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchQuery, favorites]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <View style={tw`w-full flex-1 pt-10 px-3 gap-y-4 bg-grayscale-20`}>
            <InputText
                onChangeText={setSearchQuery}
                value={searchQuery}
                placeholder="Pesquisar"
                leftSideContent={
                    <Feather
                        name="search"
                        size={20}
                        color={tw.color("text-grayscale-60")}
                    />
                }
            />

            <Text style={tw`text-xl font-medium text-grayscale-100 text-left`}>
                Produtos curtidos
            </Text>

            {searchQuery && filteredProducts.length === 0 ? (
                <Text style={tw`text-gray-500`}>
                    Nenhum favoritado encontrado.
                </Text>
            ) : null}

            {favorites.length > 0 ? (
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleItemPress(item.id)}
                        >
                            <Item
                                fetchProduct={fetchFavorites}
                                data={item}
                                likable
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={tw`justify-between mb-4`}
                    numColumns={2}
                />
            ) : (
                <View
                    style={tw`w-full h-full gap-y-4 justify-center items-center`}
                >
                    <Image source={sadRobot} style={tw`w-32 h-32`} />
                    <Text
                        style={tw`text-xl font-medium text-grayscale-100 text-center`}
                    >
                        Nenhum produto curtido.
                    </Text>
                    <Text
                        style={tw`text-base font-medium text-grayscale-60 text-center`}
                    >
                        Selecione curtir em qualquer produto para {"\n"}{" "}
                        salvá-lo em seus produtos curtidos.
                    </Text>
                </View>
            )}
        </View>
    );
}
