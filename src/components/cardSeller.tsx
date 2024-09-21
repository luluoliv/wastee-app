import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import tw from "../lib/tailwind";
import Button from "./button";
import { ItemData, items } from "./items";
import { sellers } from "./sellers";

interface CardSellerProps {
    item: ItemData | undefined;
}

const CardSeller: React.FC<CardSellerProps> = ({ item }) => {
    const router = useRouter();

    const seller = sellers.find((seller) => seller.id === item?.seller);
    const products = items.filter((item) => item?.id === seller?.id);

    if (!seller) {
        return (
            <View style={tw`border border-grayscale-40 rounded-xl p-3`}>
                <Text style={tw`text-grayscale-80 font-medium text-base`}>
                    Vendedor não encontrado
                </Text>
            </View>
        );
    }

    return (
        <View style={tw`border border-grayscale-40 rounded-xl`}>
            <View style={tw`bg-grayscale-40 p-3 items-center`}>
                <Image
                    style={tw`rounded-full w-14 h-14`}
                    source={{ uri: seller.photo }}
                    alt={seller.name}
                />
            </View>
            <View style={tw`w-full flex-row items-center justify-between p-3`}>
                <View>
                    <Text style={tw`text-grayscale-100 font-medium text-base`}>
                        {seller.name}
                    </Text>
                    <Text style={tw`text-grayscale-80 font-medium text-sm`}>
                        <Feather size={12} name="shopping-bag" color="#dfe6f5" />{" "}
                        {products.length} produtos à venda
                    </Text>
                </View>
                <Button
                    iconColor="text-grayscale-20"
                    style={tw`bg-grayscale-100 w-16 p-2`}
                    textStyle={tw`text-grayscale-20 font-semibold text-base`}
                    title="Perfil"
                    onPress={() => router.push(`/seller/${item?.seller}`)}
                />
            </View>
        </View>
    );
};

export default CardSeller;
