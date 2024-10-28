import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/src/components/header";
import tw from "@/src/lib/tailwind";
import CardSeller from "@/src/components/cardSeller";
import Button from "@/src/components/button";
import Review from "@/src/components/review";
import {
    CommentResponse,
    getCommentsBySellerId,
} from "@/src/service/commentsService";
import { ProductResponse } from "@/src/service/productsService";

const Reviews = () => {
    const router = useRouter();
    const { id, product } = useLocalSearchParams<{
        id: string;
        product?: string;
    }>();

    const parsedProduct: ProductResponse | undefined = product
        ? JSON.parse(decodeURIComponent(product))
        : null;

    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await getCommentsBySellerId(id);
                setComments(response);
            } catch (error: any) {
                setError(error.message || "Erro ao carregar comentários.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, []);

    if (loading) {
        return (
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={tw`text-grayscale-100 mt-4`}>Carregando...</Text>
            </View>
        );
    }

    if (!comments.length) {
        return (
            <Text style={tw`text-grayscale-100 text-center mt-10`}>
                Sem avaliações ainda.
            </Text>
        );
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
                <CardSeller sellerId={id} />
                <Button
                    style={tw`bg-grayscale-100`}
                    textStyle={tw`text-grayscale-20`}
                    title="Escreva um comentário"
                    onPress={() => router.push(`/review-seller/${id}`)}
                />

                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`font-medium text-xl text-grayscale-100`}>
                        ({comments?.length})
                    </Text>
                    <Text style={tw`font-medium text-xl text-grayscale-60`}>
                        Mais recentes
                    </Text>
                </View>

                <View style={tw`flex flex-col gap-y-8`}>
                    {comments?.map((review: CommentResponse, index: number) => (
                        <Review key={index} comment={review} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Reviews;
