import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import tw from "@/src/lib/tailwind";
import Header from "@/src/components/header";
import Classification from "@/src/components/classification";
import Star from "@/src/components/star";
import Input from "@/src/components/input";
import Button from "@/src/components/button";
import Avatar from "@/src/components/avatar";

import { getSellerById, SellerResponse } from "@/src/service/sellerService";
import { addComment, NewComment } from "@/src/service/commentsService";
import { useUser } from "@/src/contexts/UserContext";

const MAX_CHARACTERS = 500;

const ReviewSeller = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const {user}= useUser();

    const [seller, setSeller] = useState<SellerResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [rating, setRating] = useState(0);
    const [opinion, setOpinion] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<NewComment>({ mode: "onChange" });

    const fetchSeller = async () => {
        setLoading(true);
        try {
            const response = await getSellerById(id);
            setSeller(response);
        } catch (error: any) {
            setError(error.message || "Erro ao carregar vendedor.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeller();
    }, []);

    const onSubmit = async (data: NewComment) => {
        setLoading(true);
        try {
            await addComment({
                user: user?.id,
                product: id,
                comment: data.comment,
                rating: rating,
            });

            Alert.alert("Sucesso", "Comentário adicionado com sucesso!");
            router.replace(`/reviews/${id}`);
        } catch (error: any) {
            Alert.alert(
                "Erro",
                error.message || "Não foi possível adicionar o comentário."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <Header moreIconName="" />
            <View style={tw`gap-y-5 px-5`}>
                <View style={tw`flex-row items-center gap-x-3`}>
                    <Avatar user={seller?.user.name} />
                    <View style={tw`flex flex-col`}>
                        <Text
                            style={tw`font-semibold text-xl text-grayscale-100`}
                        >
                            {seller?.user.name}
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
                    name="comment"
                    control={control}
                    rules={{ required: "A opinião é obrigatória" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                name="comment"
                                control={control}
                                error={errors?.comment?.message}
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
                        rating === 0
                            ? "text-grayscale-100"
                            : "text-grayscale-20"
                    }`}
                    onPress={handleSubmit(onSubmit)}
                    disabled={rating === 0 || !isValid}
                />
            </View>
        </View>
    );
};

export default ReviewSeller;
