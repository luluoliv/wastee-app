import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ItemData } from "./items";
import tw from "twrnc";
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
    <View style={tw`w-1/2 p-2`}>
      <View style={tw`relative w-full`}>
        <Image
          source={{ uri: data.images[0] }}
          style={tw`w-[168px] h-[168px] rounded-lg`}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={tw`absolute flex-row gap-x-1 bottom-2 left-2 bg-[#0C0C11A3] bg-opacity-50 p-1 rounded`}
          onPress={handleClassificationPress}
        >
          <Text style={tw`text-white text-xs`}>★</Text>
          {data.rate && (
            <Text style={tw`text-white text-xs ml-1`}>{data.rate}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`absolute top-2 rounded-full right-2 bg-black bg-opacity-50 p-1`}
          onPress={handleOptionsPress}
        >
          <Feather name="more-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={tw`mt-2`}>
        <Text style={tw`text-sm font-medium text-[#DFE6F5]`}>
          {data.title}
        </Text>
        <View style={tw`flex-row gap-x-1 items-center`}>
          <Text
            style={[
              tw`text-sm font-semibold`,
              hasDiscount ? tw`text-[#FB923C]` : tw`text-[#FBFCFF]`
            ]}
          >
            {data.originalPrice}
          </Text>
          {hasDiscount && (
            <Text style={tw`text-sm font-semibold text-[#787F8D] line-through`}>
              {data.discountedPrice}
            </Text>
          )}
        </View>
        <Text style={tw`text-sm text-[#787F8D]`}>
          {data.seller}
        </Text>
      </View>
    </View>
  );
};

export default Item;
