import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import InputText from "@/src/components/inputText";
import { Feather } from "@expo/vector-icons";
import Item from "@/src/components/item";
import { items } from "@/src/data/items";
import { sadRobot } from "@/src/utils/imports";

export default function Liked() {
    const router = useRouter();

    const handleItemPress = (id: string) => {
        router.push(`/product/${id}`);
    };

    const favorites = items.filter((item) => item.favorited === true);

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

            <Text style={tw`text-xl font-medium text-grayscale-100 text-left`}>
                Produtos curtidos
            </Text>

            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleItemPress(item.id)}
                        >
                            <Item data={item} likable />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={tw`justify-between mb-4`}
                    numColumns={2}
                />
            ) : (
                <View style={tw`w-full h-full gap-y-4 justify-center items-center`}>
                    <Image source={sadRobot} style={tw`w-32 h-32`}/>
                    <Text
                        style={tw`text-xl font-medium text-grayscale-100 text-center`}
                    >
                        Nenhum produto curtido.
                    </Text>
                    <Text
                        style={tw`text-base font-medium text-grayscale-60 text-center`}
                    >
                        Selecione curtir em qualquer produto para {"\n"} salvá-lo
                        em seus produtos curtidos.
                    </Text>
                </View>
            )}
        </View>
    );
}
