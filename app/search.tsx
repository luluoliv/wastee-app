import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import tw from "@/src/lib/tailwind";
import InputText from "@/src/components/inputText";
import { Feather } from "@expo/vector-icons";
import { categories } from "@/src/data/categories";
import { getRandomColor } from "@/src/utils/getRandomColor";
import Button from "@/src/components/button";

const Search = () => {
    const router = useRouter();

    const handleItemPress = (id: string) => {
        router.push(`/category/${id}`);
    };

    // You can define the number of columns as a variable if you plan to change it
    const numColumns = 2;

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
            />

            <Text style={tw`font-medium text-xl text-grayscale-80`}>
                Categorias
            </Text>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <Button
                        onPress={() => handleItemPress(item.id)}
                        title={item.name}
                        style={tw`bg-["${getRandomColor()}"]`}
                    />
                )}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={tw`justify-between mb-4`}
                numColumns={numColumns}
                // Set a unique key for FlatList based on numColumns
                key={`${numColumns}`}
            />
        </View>
    );
};

export default Search;
