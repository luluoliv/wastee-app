import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { ItemData } from "./items";
import tw from "@/src/lib/tailwind";
import Dropdown from "./dropdown";
import ModalReport from "./modalReport";
import { sellers } from "./sellers";

interface ItemProps {
    data: ItemData;
}

const Item: React.FC<ItemProps> = ({ data }) => {
    const router = useRouter();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isReport, setIsReport] = useState(false);

    const seller = sellers.find((seller) => data.seller == seller.id);

    const hasDiscount = !!data.discountedPrice;

    const options = [
        {
            label: data.favorited ? "Descurtir" : "Curtir",
            icon: data.favorited ? "heart" : "heart-o",
            action: () => console.log("produto curtido."),
        },
        {
            label: "Visitar vendedor",
            icon: "user",
            action: () => router.push(`/seller/${data.id}`),
        },
        {
            label: "Compartilhar",
            icon: "share-2",
            action: () => console.log("Produto compartilhado."),
        },
        {
            label: "Denunciar",
            icon: "alert-circle",
            action: () => setIsReport(!isReport),
        },
    ];

    return (
        <View style={tw`w-[168px]`}>
            <Dropdown
                style={tw`top-10 left-4`}
                options={options}
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
            />
            <View style={tw`relative w-full`}>
                <Image
                    source={{ uri: data?.images[0] }}
                    style={tw`w-[168px] h-[168px] rounded-xl`}
                    resizeMode="cover"
                />
                <View
                    style={tw`absolute flex-row bottom-2 left-2 bg-grayscale-20 bg-opacity-50 p-1 rounded`}
                >
                    <Text style={tw`text-grayscale-100 text-xs`}>★</Text>
                    {data.rate && (
                        <Text
                            style={tw`text-grayscale-100 font-semibold text-xs ml-1`}
                        >
                            {data.rate}
                        </Text>
                    )}
                </View>
                <ModalReport
                    visible={isReport}
                    onClose={() => setIsReport(false)}
                />
                <TouchableOpacity
                    style={tw`absolute top-2 rounded-full right-2 bg-grayscale-20 bg-opacity-50 p-1`}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Feather name="more-horizontal" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View style={tw`mt-2 w-full`}>
                <Text style={tw`text-sm font-medium text-grayscale-80`}>
                    {data.title}
                </Text>
                <View style={tw`flex-row gap-x-1 items-center`}>
                    <Text
                        style={[
                            tw`text-sm font-semibold`,
                            hasDiscount
                                ? tw`text-primary-light`
                                : tw`text-grayscale-100`,
                        ]}
                    >
                        {data.originalPrice}
                    </Text>
                    {hasDiscount && (
                        <Text
                            style={tw`text-sm font-semibold text-grayscale-60 line-through`}
                        >
                            {data.discountedPrice}
                        </Text>
                    )}
                </View>
                <Text style={tw`text-sm font-medium text-grayscale-60`}>
                    {seller?.name}
                </Text>
            </View>
        </View>
    );
};

export default Item;
