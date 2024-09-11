import React from "react";
import tw from "twrnc";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import Item from "@/src/components/item";
import Input from "@/src/components/input";
import { useForm } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { items } from "@/src/components/items";

export default function Home() {
  const router = useRouter();
  const { control } = useForm();

  const handleItemPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <View style={tw`flex-1 pt-10 bg-gray-900`}>
      <View style={tw`w-full p-4`}>
        <Input
          leftSideContent={
            <Feather fill="white" size={20} name="search" color="white" />
          }
          control={control}
          placeholder="Pesquisar"
          name="search"
          label="Pesquisar"
        />
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <Item key={item.id} data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-2`}
        numColumns={2}
      />
    </View>
  );
}
