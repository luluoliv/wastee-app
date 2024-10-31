import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import Dropdown from "./dropdown";
import ModalReport from "./modalReport";
import LikeButton from "./like";
import { ProductResponse } from "../service/productsService";
import { favoriteItem } from "../utils/favoriteItem";
import { formatCurrency } from "../utils/formatCurrency";
import { useUser } from "../contexts/UserContext";

interface ItemProps {
    data: ProductResponse;
    likable?: boolean;
    fetchProduct: ()=> Promise<void>
}

const Item: React.FC<ItemProps> = ({ data, likable, fetchProduct }) => {
    const router = useRouter();
    const { user } = useUser();        

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isReport, setIsReport] = useState(false);

    const hasDiscount = !!data?.discounted_price;

    const options = [
        {
            label: data?.favorited ? "Descurtir" : "Curtir",
            icon: "heart",
            action: () => favoriteItem(data, user, fetchProduct),
        },
        {
            label: "Visitar vendedor",
            icon: "user",
            action: () => data?.id && router.push(`/seller/${data.seller_id}`),
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

    if (!data) {
        return (
            <View style={tw`p-4 bg-red-100 rounded`}>
                <Text style={tw`text-red-500`}>
                    Dados do produto não disponíveis
                </Text>
            </View>
        );
    }

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
                    source={{
                        uri:
                            data.images[0]?.external_image_url ??
                            "https://via.placeholder.com/150",
                    }}
                    style={tw`w-[168px] h-[168px] rounded-xl`}
                    resizeMode="cover"
                />

                {data.rate && (
                    <View
                        style={tw`absolute flex-row bottom-2 left-2 bg-grayscale-20 bg-opacity-50 p-1 rounded`}
                    >
                        <Text style={tw`text-grayscale-100 text-xs`}>★</Text>
                        <Text
                            style={tw`text-grayscale-100 font-semibold text-xs ml-1`}
                        >
                            {data.rate}
                        </Text>
                    </View>
                )}
                <ModalReport
                    visible={isReport}
                    onClose={() => setIsReport(false)}
                />
                <TouchableOpacity
                    style={tw`absolute top-2 rounded-full right-2 bg-grayscale-20 bg-opacity-50 ${
                        likable ? "" : "p-1"
                    }`}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    {likable ? (
                        <LikeButton
                            item={data}
                            size="small"
                            onFavoriteToggle={() =>
                                favoriteItem(data, user, fetchProduct)
                            }
                        />
                    ) : (
                        <Feather
                            name="more-horizontal"
                            size={20}
                            color="white"
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={tw`mt-2 w-full`}>
                <Text style={tw`text-sm font-medium text-grayscale-80`}>
                    {data.title || "Título indisponível"}
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
                        {formatCurrency(data.original_price) ||
                            "Preço não disponível"}
                    </Text>
                    {hasDiscount && (
                        <Text
                            style={tw`text-sm font-semibold text-grayscale-60 line-through`}
                        >
                            {formatCurrency(data.discounted_price)}
                        </Text>
                    )}
                </View>
                <Text style={tw`text-sm font-medium text-grayscale-60`}>
                    {data.seller_name || "Vendedor desconhecido"}
                </Text>
            </View>
        </View>
    );
};

export default Item;
