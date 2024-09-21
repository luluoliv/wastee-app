import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/src/components/header";
import tw from "@/src/lib/tailwind";
import CardSeller from "@/src/components/cardSeller";
import { items } from "@/src/components/items";
import Button from "@/src/components/button";
import Review from "@/src/components/review";

const Reviews = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams<{ id: string }>();

    const item = items.find((item) => id === item.seller);

    if (!item?.comments) {
        return <Text style={tw`text-grayscale-100 text-center mt-10`}>Sem avaliações ainda.</Text>;
    }

    return (
        <View style={tw`flex-1 w-full h-full  py-10 bg-grayscale-20`}>
            <Header
                titleStyle={tw`text-grayscale-100`}
                title="Opiniões sobre"
                moreIconName="share-2"
            />
            <ScrollView
                contentContainerStyle={tw`w-full px-5 flex-col flex gap-y-5`}
            >
                <CardSeller item={item} />
                <Button
                    style={tw`bg-grayscale-100`}
                    textStyle={tw`text-grayscale-20`}
                    title="Escreva um comentário"
                    onPress={() =>router.push(`/review-seller/${item.seller}`)}
                />

                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`font-medium text-xl text-grayscale-100`}>
                        ({item?.comments?.length})
                    </Text>
                    <Text style={tw`font-medium text-xl text-grayscale-60`}>
                        Mais recentes
                    </Text>
                </View>

                <View style={tw`flex flex-col gap-y-8`}>
                    {item?.comments?.map((review, index) => (
                        <Review key={index} comment={review} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Reviews;
