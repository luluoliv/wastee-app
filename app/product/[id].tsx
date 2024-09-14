import React from "react";
import tw from "@/src/lib/tailwind";
import { View, Text, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { items } from "@/src/components/items";

const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = items.find(item => item.id === id);
  const router = useRouter();

  if (!item) {
    return <Text style={tw`text-white`}>Item não encontrado</Text>;
  }

  return (
    <View style={tw`flex-1 pt-10 bg-gray-900`}>

      <View style={tw`flex-row items-center justify-between p-4 bg-gray-800`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-[#fff] text-lg font-bold`}>{item.category}</Text>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`flex-1 p-4`}>
        <ScrollView horizontal pagingEnabled style={tw`mb-6`}>
          {item?.images?.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={tw`w-[353px] h-[353px] rounded-lg`} />
          ))}
        </ScrollView>

        <Text style={tw`text-white text-2xl font-bold mb-2`}>{item.title}</Text>
        <Text style={tw`text-white text-lg mb-4`}>{item.description}</Text>

        <View style={tw`mb-4`}>
          <Button title="Add to Favorites" onPress={() => {/* Adicione lógica para adicionar aos favoritos */}} />
          <Button title="Share" onPress={() => {/* Adicione lógica para compartilhar */}} />
        </View>

        <View>
          <Text style={tw`text-white text-lg font-bold mb-2`}>Comentários:</Text>
          {item.comments?.map((comment, index) => (
            <View key={index} style={tw`mb-4`}>
              <Text style={tw`text-white font-semibold`}>{comment.user}</Text>
              <Text style={tw`text-gray-400`}>{comment.comment}</Text>
              <Text style={tw`text-gray-600 text-sm`}>{comment.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Product;
