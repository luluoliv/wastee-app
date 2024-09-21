import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import tw from "@/src/lib/tailwind";
import Header from "@/src/components/header";
import { sellers } from "@/src/components/sellers";
import Classification from "@/src/components/classification";
import Star from "@/src/components/star";
import Input from "@/src/components/input";
import Button from "@/src/components/button";

const MAX_CHARACTERS = 500;

const ReviewSeller = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const seller = sellers.find((seller) => id === seller.id);

    const [rating, setRating] = useState(0);
    const [opinion, setOpinion] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const handleOpinionChange = (text: string) => {
        setOpinion(text);
    };

    return (
        <View style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <Header moreIconName="" />
            <View style={tw`gap-y-5 px-5`}>
                <View style={tw`flex-row items-center gap-x-3`}>
                    <Image
                        source={{ uri: seller?.photo }}
                        style={tw`w-14 h-14 rounded-full`}
                    />
                    <View style={tw`flex flex-col`}>
                        <Text
                            style={tw`font-semibold text-xl text-grayscale-100`}
                        >
                            {seller?.name}
                        </Text>
                        <Classification comments={seller?.comments} />
                    </View>
                </View>

                <Text style={tw`font-medium text-xl text-grayscale-100`}>
                    Avalie este vendedor
                </Text>
                <View style={tw`px-5 flex-row justify-around`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            filled={star <= rating}
                            onPress={() => setRating(star)}
                        />
                    ))}
                </View>

                <Controller
                    name="rate"
                    control={control}
                    rules={{ required: "A avaliação é obrigatória" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                name="rate"
                                control={control}
                                error={errors?.rate?.message}
                                label="Escreva sua opinião"
                                maxLength={MAX_CHARACTERS}
                                onChangeText={(text) => {
                                    onChange(text);
                                }}
                                onBlur={onBlur}
                                value={value}
                            />
                            <Text
                                style={tw`text-grayscale-60 text-sm font-medium text-right`}
                            >
                                {value?.length || 0}/{MAX_CHARACTERS}
                            </Text>
                        </>
                    )}
                />

                <Button
                    title="Publicar"
                    style={tw`${
                        rating === 0 ? "bg-grayscale-60" : "bg-grayscale-100"
                    }`}
                    textStyle={tw`${
                        rating === 0 ? "text-grayscale-100" : "text-grayscale-20"
                    }`}
                    onPress={() => {
                        console.log("Opinião publicada.");
                        router.back();
                    }}
                    disabled={rating === 0}
                />
            </View>
        </View>
    );
};

export default ReviewSeller;
