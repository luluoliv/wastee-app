import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import InputText from "@/src/components/inputText";
import { categories } from "@/src/data/categories";
import Button from "@/src/components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchHistoric from "@/src/components/searchHistoric";
import { items } from "@/src/data/items";

const Search = () => {
    const router = useRouter();
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(items);

    const handleItemPress = async (id: string) => {
        const storedSearches = await AsyncStorage.getItem("recentSearches");
        let searches = storedSearches ? JSON.parse(storedSearches) : [];

        if (!searches.includes(id)) {
            searches = [id, ...searches].slice(0, 5);
            await AsyncStorage.setItem("recentSearches", JSON.stringify(searches));
        }

        router.push(`/category/${id}`);
    };

    const loadRecentSearches = async () => {
        const storedSearches = await AsyncStorage.getItem("recentSearches");
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    };

    useEffect(() => {
        loadRecentSearches();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = items.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(items);
        }
    }, [searchTerm]);

    const numColumns = 2;
    const COLORS = [
        "#5533EB",
        "#00483A",
        "#893A13",
        "#F44D2B",
        "#00955B",
        "#9618C2",
        "#D554FE",
        "#8C8F02",
    ];

    return (
        <View style={tw`w-full flex-1 pt-10 px-3 gap-y-5 bg-grayscale-20`}>
            <InputText
                placeholder="Pesquisar"
                value={searchTerm}
                onChangeText={(text: string) => setSearchTerm(text)}
                leftSideContent={
                    <Feather
                        name="search"
                        size={20}
                        color={tw.color("text-grayscale-60")}
                    />
                }
            />

            {!searchTerm && recentSearches.length > 0 && (
                <View style={tw`w-full gap-y-3`}>
                    <Text style={tw`text-xl font-medium text-grayscale-80`}>
                        Pesquisas Recentes
                    </Text>
                    <FlatList
                        data={recentSearches}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleItemPress(item)}>
                                <SearchHistoric search={item} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                        contentContainerStyle={tw`gap-y-2`}
                        style={tw`mb-4`}
                    />
                </View>
            )}

            <View style={tw`gap-y-3`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`font-medium text-xl text-grayscale-80`}>
                        {searchTerm ? "Resultados" : "Categorias"}
                    </Text>
                    {searchTerm ? (
                        <Text
                            style={tw`text-xl font-medium text-grayscale-60 text-right`}
                        >
                            Mais recentes
                        </Text>
                    ) : null}
                </View>
                <FlatList
                    data={categories}
                    renderItem={({ item, index }) => (
                        <View style={tw`flex-1 mt-2`}>
                            <Button
                                onPress={() => handleItemPress(item.id)}
                                title={item.name}
                                style={tw`bg-[${COLORS[index % COLORS.length]}]`}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={tw`justify-between gap-2`}
                    numColumns={numColumns}
                />
            </View>
        </View>
    );
};

export default Search;
