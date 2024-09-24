import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import tw from "@/src/lib/tailwind";
import InputText from "@/src/components/inputText";
import { Feather } from "@expo/vector-icons";
import { categories } from "@/src/data/categories";
import Button from "@/src/components/button";

const Search = () => {
  const router = useRouter();

  const handleItemPress = (id: string) => {
    router.push(`/category/${id}`);
  };

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

      <Text style={tw`font-medium text-xl text-grayscale-80`}>Categorias</Text>
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
  );
};

export default Search;
