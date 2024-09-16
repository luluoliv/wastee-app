import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";

import tw from "@/src/lib/tailwind";

import { items } from "@/src/components/items";
import LikeButton from "@/src/components/like";
import Classification from "@/src/components/classification";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import Divider from "@/src/components/divider";
import ReviewCard from "@/src/components/reviewCard";

const Product = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const item = items.find((item) => item.id === id);
    const router = useRouter();

    const maxLengthDescription = 150;
    const [isOpen, setIsOpen] = useState(false);

    if (!item) {
        return <Text style={tw`text-grayscale-100`}>Item não encontrado.</Text>;
    }

    const truncatedDescription =
        item.description.length > maxLengthDescription
            ? item.description.slice(0, maxLengthDescription) + "..."
            : item.description;

    return (
        <View style={tw`flex-1 py-10 bg-grayscale-20`}>
            <View
                style={tw`flex-row items-center justify-between p-4 bg-grayscale-20`}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-primary text-lg font-bold`}>
                    {item.category}
                </Text>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`w-full px-4`}>
                <ScrollView horizontal pagingEnabled>
                    {item?.images?.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={tw`w-[353px] h-[353px] rounded-xl mr-2`}
                        />
                    ))}
                </ScrollView>

                <View style={tw`flex-col gap-y-5`}>
                    <View style={tw`flex-col mt-2`}>
                        <View
                            style={tw`w-full flex-row justify-between items-center gap-x-2`}
                        >
                            <Text
                                style={tw`text-grayscale-80 text-xl font-medium max-w-xs`}
                            >
                                {item.title}
                            </Text>
                            <LikeButton
                                item={item}
                                size="small"
                                onFavoriteToggle={(id) =>
                                    console.log(`item ${id} favoritado.`)
                                }
                            />
                        </View>

                        <View style={tw`flex-row gap-x-1 items-center`}>
                            <Text
                                style={[
                                    tw`font-semibold text-xl`,
                                    !!item.discountedPrice
                                        ? tw`text-primary-light`
                                        : tw`text-grayscale-100`,
                                ]}
                            >
                                {item.originalPrice}
                            </Text>
                            {!!item.discountedPrice && (
                                <Text
                                    style={tw`font-semibold text-xl text-grayscale-60 line-through`}
                                >
                                    {item.discountedPrice}
                                </Text>
                            )}
                        </View>

                        <Classification
                            maxRating={5}
                            comments={item.comments}
                            size={14}
                        />

                        <Text
                            style={tw`text-grayscale-60 font-medium text-base`}
                        >
                            <Feather name="user" size={16} color="#787f8d" />{" "}
                            {item.seller.name
                                ? item.seller.name
                                : "Nome não disponível"}
                        </Text>
                    </View>

                    <Modal
                        title="Descrição"
                        visible={isOpen}
                        onClose={() => setIsOpen(false)}
                    >
                        <Text
                            style={tw`text-grayscale-100 font-normal text-base`}
                        >
                            {item.description}
                        </Text>
                    </Modal>

                    <View style={tw`flex-col gap-y-2`}>
                        <Text style={tw`text-grayscale-80 font-medium text-xl`}>
                            Descrição
                        </Text>
                        <View>
                            <Text
                                style={tw`text-grayscale-100 font-normal text-base`}
                            >
                                {item.description.length > maxLengthDescription
                                    ? truncatedDescription
                                    : item.description}
                            </Text>
                            {item.description.length > maxLengthDescription && (
                                <TouchableOpacity
                                    onPress={() => setIsOpen(!isOpen)}
                                >
                                    <Text
                                        style={tw`text-primary font-medium text-base text-right`}
                                    >
                                        {item.description.length >
                                        maxLengthDescription
                                            ? "Ler mais"
                                            : null}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <Button
                        icon="message-circle"
                        iconColor="text-grayscale-20"
                        style={tw`bg-grayscale-100`}
                        textStyle={tw`text-grayscale-20 font-semibold text-base`}
                        title="Converse com o vendedor"
                        onPress={() => console.log("Converse com o vendedor")}
                    />

                    <View style={tw`flex-col gap-y-2`}>
                        <Text style={tw`text-grayscale-80 font-medium text-xl`}>
                            Localização
                        </Text>
                        <View style={tw`flex-row justify-between`}>
                            <Text
                                style={tw`text-grayscale-60 font-medium text-base`}
                            >
                                Estado
                            </Text>
                            <Text
                                style={tw`text-grayscale-100 font-medium text-base`}
                            >
                                {item?.location.state}
                            </Text>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text
                                style={tw`text-grayscale-60 font-medium text-base`}
                            >
                                Cidade
                            </Text>
                            <Text
                                style={tw`text-grayscale-100 font-medium text-base`}
                            >
                                {item?.location.city}
                            </Text>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text
                                style={tw`text-grayscale-60 font-medium text-base`}
                            >
                                Bairro
                            </Text>
                            <Text
                                style={tw`text-grayscale-100 font-medium text-base`}
                            >
                                {item?.location.neighborhood}
                            </Text>
                        </View>
                    </View>

                    <Divider />

                    <View style={tw`border border-grayscale-40 rounded-xl`}>
                        <View style={tw`bg-grayscale-40 p-3 items-center`}>
                            <Image
                                style={tw`rounded-full w-14 h-14`}
                                src={item.seller.photo}
                                alt={item.seller.name}
                            />
                        </View>
                        <View
                            style={tw`w-full flex-row items-center justify-between p-3`}
                        >
                            <View>
                                <Text
                                    style={tw`text-grayscale-100 font-medium text-base`}
                                >
                                    {item.seller.name}
                                </Text>
                                <Text
                                    style={tw`text-grayscale-80 font-medium text-sm`}
                                >
                                    <Feather
                                        size={12}
                                        name="shopping-bag"
                                        color="#dfe6f5"
                                    />{" "}
                                    {item.seller.products.length} produtos à
                                    venda
                                </Text>
                            </View>
                            <Button
                                iconColor="text-grayscale-20"
                                style={tw`bg-grayscale-100 w-16 p-2`}
                                textStyle={tw`text-grayscale-20 font-semibold text-base`}
                                title="Perfil"
                                onPress={() =>
                                    console.log("perfil do vendedor")
                                }
                            />
                        </View>
                    </View>

                    <Divider />

                    <View style={tw`flex-col gap-y-3`}>
                        <View style={tw`flex-row justify-between`}>
                            <View style={tw`flex-row gap-x-1`}>
                                <Text
                                    style={tw`text-grayscale-80 font-medium text-xl`}
                                >
                                    Opiniões sobre vendedor
                                </Text>
                                <Text
                                    style={tw`text-grayscale-60 font-medium text-xl`}
                                >
                                    ({item.comments?.length})
                                </Text>
                            </View>

                            <View style={tw`flex-row items-center gap-x-1`}>
                                <FontAwesome
                                    name="star"
                                    size={16}
                                    color="#fbfcff"
                                />
                                <Text
                                    style={tw`text-grayscale-80 font-medium text-xl`}
                                >
                                    {item.rate}
                                </Text>
                            </View>
                        </View>

                        <ScrollView horizontal pagingEnabled contentContainerStyle={tw`flex-row items-center gap-x-3 pb-2`}>
                            {item?.comments?.map((comment, index) => (
                                <ReviewCard comment={comment} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Product;
