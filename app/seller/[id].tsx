import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";

import Header from "@/src/components/header";
import Dropdown from "@/src/components/dropdown";
import Classification from "@/src/components/classification";
import Button from "@/src/components/button";
import Footer from "@/src/components/footer";
import Item from "@/src/components/item";
import ModalReport from "@/src/components/modalReport";

import { getSellerById, SellerResponse } from "@/src/service/sellerService";
import Avatar from "@/src/components/avatar";
import { createChat } from "@/src/service/chatsService";
import { useUser } from "@/src/contexts/UserContext";
import Divider from "@/src/components/divider";
import ReviewCard from "@/src/components/reviewCard";
import { CommentResponse } from "@/src/service/commentsService";

const Seller = () => {
    const { user } = useUser();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isReport, setIsReport] = useState(false);

    const [seller, setSeller] = useState<SellerResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingChat, setLoadingChat] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

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

    const talkToTheSeller = async () => {
        setLoadingChat(true);
        try {
            if (seller?.chat_id) {
                router.push(`/chat/${seller?.chat_id}`);
            } else {
                const response = await createChat({
                    seller: seller?.id,
                    buyer: user?.id,
                });

                router.push(`/chat/${response.chat.id}`);
                Alert.alert("Sucesso", response.message);
            }
        } catch (err: any) {
            Alert.alert("Erro", err.message);
        } finally {
            setLoadingChat(false);
        }
    };

    const options = [
        {
            label: "Compartilhar",
            icon: "share-2",
            action: () => console.log("Produto compartilhado."),
        },
        {
            label: "Denunciar",
            icon: "alert-circle",
            action: () => setIsReport(!isReport),
        },
    ];

    if (loading) {
        return (
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={tw`text-grayscale-80 mt-4`}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={tw`flex-1 py-10 bg-grayscale-20`}>
            <Header
                title=""
                moreIconName="more-horizontal"
                onMorePress={() => setDropdownVisible(!dropdownVisible)}
            />

            <ModalReport
                visible={isReport}
                onClose={() => setIsReport(false)}
            />

            <Dropdown
                options={options}
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
            />
            <ScrollView contentContainerStyle={tw`flex-col gap-y-5 px-5`}>
                <View style={tw`flex-row items-center gap-x-3`}>
                    <Avatar user={seller?.user?.name} />
                    <View>
                        <Text
                            style={tw`text-grayscale-100 font-semibold text-xl`}
                        >
                            {seller?.user?.name}
                        </Text>
                        <Classification size={14} comments={seller?.comments} />
                    </View>
                </View>

                <Button
                    icon="message-circle"
                    iconColor="text-grayscale-20"
                    style={tw`bg-grayscale-100`}
                    textStyle={tw`text-grayscale-20 font-semibold text-base`}
                    title="Converse com o vendedor"
                    onPress={talkToTheSeller}
                />

                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`font-medium text-grayscale-80 text-xl`}>
                        Produtos
                    </Text>
                    <Text style={tw`font-medium text-grayscale-60 text-xl`}>
                        ({seller?.products?.length})
                    </Text>
                </View>

                <View style={tw`flex-col gap-y-3`}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        contentContainerStyle={tw`flex-row items-center gap-x-3`}
                    >
                        {seller?.products?.length || 0 ? (
                            seller?.products.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        router.push(`/product/${product.id}`)
                                    }
                                >
                                    <Item
                                        likable
                                        fetchProduct={fetchSeller}
                                        data={product}
                                    />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text
                                style={tw`text-grayscale-100 font-medium text-base`}
                            >
                                Nenhum produto encontrado.
                            </Text>
                        )}
                    </ScrollView>

                    {(seller?.products?.length || 0) > 0 && (
                        <Button
                            title="Ver produtos"
                            style={tw`bg-grayscale-40`}
                            onPress={() =>
                                router.push(`/products-seller/${seller?.id}`)
                            }
                        />
                    )}
                </View>

                <Divider />

                <View style={tw`flex-col gap-y-2`}>
                    <View style={tw`flex-row justify-between`}>
                        <Text
                            style={tw`text-grayscale-60 font-medium text-base`}
                        >
                            Estado
                        </Text>
                        <Text
                            style={tw`text-grayscale-100 font-medium text-base`}
                        >
                            {seller?.state}
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
                            {seller?.city}
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
                            {seller?.neighborhood}
                        </Text>
                    </View>
                </View>
                <Divider />

                <ScrollView
                    horizontal
                    pagingEnabled
                    contentContainerStyle={tw`flex-row items-center gap-x-3`}
                >
                    {seller?.comments?.map((comment: CommentResponse, index: number) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                router.push(`/reviews/${comment.user}`)
                            }
                            disabled={comment.comment?.length < 100}
                        >
                            <ReviewCard comment={comment} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Button
                    style={tw`bg-grayscale-40`}
                    title="Ver análises"
                    onPress={() => router.push(`/reviews/${seller?.id}`)}
                />
                <Footer />
            </ScrollView>
        </View>
    );
};

export default Seller;
