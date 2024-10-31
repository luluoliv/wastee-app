import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import tw from "@/src/lib/tailwind";

import { getAllProducts, ProductResponse } from "@/src/service/productsService";
import Item from "@/src/components/item";
import InputText from "@/src/components/inputText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchHistoric from "@/src/components/searchHistoric";
import {
    CategoryResponse,
    getAllCategories,
} from "@/src/service/categoriesService";
import { COLORS } from "@/src/utils/colors";

export default function Home() {
    const router = useRouter();

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // handle search
    const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
        []
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response);
            setFilteredProducts(response);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar produtos.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar produtos.");
        } finally {
            setLoading(false);
        }
    };

    const loadRecentSearches = async () => {
        const storedSearches = await AsyncStorage.getItem("recentSearches");
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    };

    useEffect(() => {
        loadRecentSearches();
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        const results = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchQuery, products]);

    const updateRecentSearches = async () => {
        let searches = [...recentSearches];
        if (!searchQuery) return;

        if (!searches.includes(searchQuery)) {
            searches = [searchQuery, ...searches].slice(0, 5);
            await AsyncStorage.setItem(
                "recentSearches",
                JSON.stringify(searches)
            );
        }
    };

    const handleItemPress = (id: string | undefined) => {
        router.push(`/product/${id}`);
        updateRecentSearches();
    };

    const handleCategoryPress = (id: string) => {
        router.push(`/category/${id}`);
        updateRecentSearches();
        setSearchQuery("");
        setIsSearching(false);
    };

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
        <View style={tw`w-full flex-1 pt-10 px-3 gap-y-3 bg-grayscale-20`}>
            <InputText
                placeholder="Pesquisar"
                onChangeText={(text) => {
                    setSearchQuery(text);
                    setIsSearching(!!text);
                }}
                value={searchQuery}
                setFocused={setFocused}
                focused={focused}
                leftSideContent={
                    <Feather
                        name="search"
                        size={20}
                        color={tw.color("text-grayscale-60")}
                    />
                }
            />

            {focused &&
                !isSearching &&
                !searchQuery &&
                recentSearches.length > 0 && (
                    <View style={tw`w-full gap-y-3`}>
                        <Text style={tw`text-xl font-medium text-grayscale-80`}>
                            Pesquisas Recentes
                        </Text>
                        <FlatList
                            data={recentSearches}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => setSearchQuery(item)}
                                >
                                    <SearchHistoric search={item} />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                            contentContainerStyle={tw`gap-y-2`}
                            style={tw`mb-4`}
                        />
                    </View>
                )}

            {focused && !isSearching && (
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`font-medium text-xl text-grayscale-80`}>
                        {!searchQuery ? "Categorias" : "Resultados"}
                    </Text>
                    {searchQuery && (
                        <Text
                            style={tw`text-xl font-medium text-grayscale-60 text-right`}
                        >
                            Mais recentes
                        </Text>
                    )}
                </View>
            )}

            {focused && !searchQuery && (
                <FlatList
                    data={categories}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => handleCategoryPress(item.id)}
                            style={tw`flex-1 mt-2 p-2 rounded-lg bg-[${
                                COLORS[index % COLORS.length]
                            }]`}
                        >
                            <Text
                                style={tw`text-center text-grayscale-100 font-medium text-base`}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={tw`w-full h-full`}
                    columnWrapperStyle={tw`justify-between gap-2`}
                    numColumns={2}
                />
            )}

            {searchQuery && filteredProducts.length === 0 && focused ? (
                <Text style={tw`text-gray-500`}>
                    Nenhum produto encontrado.
                </Text>
            ) : null}

            {isSearching && !searchQuery ? null : (
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleItemPress(item.id)}
                        >
                            <Item
                                fetchProduct={fetchProducts}
                                data={item || {}}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={tw`justify-between mb-4`}
                    numColumns={2}
                />
            )}
        </View>
    );
}
