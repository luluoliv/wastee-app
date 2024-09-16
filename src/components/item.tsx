import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ItemData } from "./items";
import tw from "@/src/lib/tailwind";
import { Feather } from "@expo/vector-icons";

interface ItemProps {
    data: ItemData;
}

const Item: React.FC<ItemProps> = ({ data }) => {
    const handleClassificationPress = () => {
        console.log("Classification pressed");
    };

    const handleOptionsPress = () => {
        console.log("Options pressed");
    };

    const hasDiscount = !!data.discountedPrice;

    return (
        <View style={tw`w-[168px]`}>
            <View style={tw`relative w-full`}>
                <Image
                    source={{ uri: data.images[0] }}
                    style={tw`w-[168px] h-[168px] rounded-xl`}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    style={tw`absolute flex-row bottom-2 left-2 bg-grayscale-20 bg-opacity-50 p-1 rounded`}
                    onPress={handleClassificationPress}
                >
                    <Text style={tw`text-grayscale-100 text-xs`}>★</Text>
                    {data.rate && (
                        <Text style={tw`text-grayscale-100 font-semibold text-xs ml-1`}>
                            {data.rate}
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`absolute top-2 rounded-full right-2 bg-grayscale-20 bg-opacity-50 p-1`}
                    onPress={handleOptionsPress}
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
                <Text style={tw`text-sm font-medium text-grayscale-60`}>{data.seller.name}</Text>
            </View>
        </View>
    );
};

export default Item;
