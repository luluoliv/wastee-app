import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";

import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";

import tw from "@/src/lib/tailwind";

import LikeButton from "@/src/components/like";
import Classification from "@/src/components/classification";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import Divider from "@/src/components/divider";
import ReviewCard from "@/src/components/reviewCard";
import CardSeller from "@/src/components/cardSeller";
import Header from "@/src/components/header";
import Dropdown from "@/src/components/dropdown";
import Footer from "@/src/components/footer";
import ModalReport from "@/src/components/modalReport";

import { ProductResponse, getProductById } from "@/src/service/productsService";
import { CommentResponse, getComments } from "@/src/service/commentsService";
import { createChat } from "@/src/service/chatsService";

import { useUser } from "@/src/contexts/UserContext";
import { favoriteItem } from "@/src/utils/favoriteItem";
import { formatCurrency } from "@/src/utils/formatCurrency";

const Product = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { user } = useUser();

    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [comments, setComments] = useState<CommentResponse[]>([]);

    const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
    const [loadingComments, setLoadingComments] = useState<boolean>(false);
    const [loadingChat, setLoadingChat] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const fetchProduct = async () => {
        setLoadingProduct(true);
        try {
            const response = await getProductById(id);
            setProduct(response);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar produto.");
        } finally {
            setLoadingProduct(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComments(true);
            try {
                const response = await getComments(id);
                setComments(response);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoadingComments(false);
            }
        };

        fetchComments();
    }, []);

    const talkToTheSeller = async () => {
        setLoadingChat(true);
        try {
            if (product?.chat_id) {
                router.push(`/chat/${product.chat_id}`);
            } else {
                const response = await createChat({
                    seller: product?.seller_id,
                    buyer: user?.id,
                });

                if (response && response.chat.id) {
                    router.push(`/chat/${response.chat.id}`);
                    Alert.alert("Sucesso", response.message);
                } else {
                    Alert.alert("Erro", "Não foi possível iniciar o chat.");
                }
            }
        } catch (err: any) {
            Alert.alert("Erro", err.message);
        } finally {
            setLoadingChat(false);
        }
    };

    const maxLengthDescription = 150;

    const [isOpen, setIsOpen] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const options = [
        {
            label: "Visitar vendedor",
            icon: "shopping-bag",
            action: () => router.push(`/seller/${product?.seller_id}`),
        },
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

    if (loadingProduct || loadingComments) {
        return (
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <ActivityIndicator size="large" color="#000" />
                <Text style={tw`mt-2 text-grayscale-100`}>Carregando...</Text>
            </View>
        );
    }

    if (!product) {
        return <Text style={tw`text-grayscale-100`}>Item não encontrado.</Text>;
    }

    if (error) {
        return (
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <Text style={tw`text-red-500`}>{error}</Text>
                <Button title="Tentar novamente" onPress={fetchProduct} />
            </View>
        );
    }

    const truncatedDescription =
        product.description.length > maxLengthDescription
            ? product.description.slice(0, maxLengthDescription) + "..."
            : product.description;

    return (
        <View style={tw`flex-1 py-10 bg-grayscale-20`}>
            <Header
                title={product?.category_name}
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

            <ScrollView contentContainerStyle={tw`w-full px-4`}>
                <ScrollView horizontal pagingEnabled>
                    {product?.images?.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                source={{ uri: image.external_image_url ? image.external_image_url : image.image }}
                                contentFit="contain"
                                style={tw`w-[353px] h-[353px] rounded-xl mr-2`}
                            />
                        );
                    })}
                </ScrollView>

                <View style={tw`flex-col gap-y-5`}>
                    <View style={tw`flex-col mt-2`}>
                        <View
                            style={tw`w-full flex-row justify-between items-center gap-x-2`}
                        >
                            <Text
                                style={tw`text-grayscale-80 text-xl font-medium max-w-xs`}
                            >
                                {product?.title}
                            </Text>
                            <LikeButton
                                item={product}
                                size="small"
                                onFavoriteToggle={() =>
                                    favoriteItem(product, user, fetchProduct)
                                }
                            />
                        </View>

                        <View style={tw`flex-row gap-x-1 items-center`}>
                            <Text
                                style={[
                                    tw`font-semibold text-xl`,
                                    !!product?.discounted_price
                                        ? tw`text-primary-light`
                                        : tw`text-grayscale-100`,
                                ]}
                            >
                                {formatCurrency(product?.original_price)}
                            </Text>
                            {!!product?.discounted_price && (
                                <Text
                                    style={tw`font-semibold text-xl text-grayscale-60 line-through`}
                                >
                                    {formatCurrency(product?.discounted_price)}
                                </Text>
                            )}
                        </View>

                        <Classification
                            maxRating={5}
                            comments={comments}
                            size={14}
                        />

                        <Text
                            style={tw`text-grayscale-60 font-medium text-base`}
                        >
                            <Feather name="user" size={16} color="#787f8d" />{" "}
                            {product.seller_id
                                ? product.seller_name
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
                            {product?.description}
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
                                {product?.description?.length >
                                maxLengthDescription
                                    ? truncatedDescription
                                    : product?.description}
                            </Text>
                            {product?.description?.length >
                                maxLengthDescription && (
                                <TouchableOpacity
                                    onPress={() => setIsOpen(!isOpen)}
                                >
                                    <Text
                                        style={tw`text-primary font-medium text-base text-right`}
                                    >
                                        Ler mais
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <Button
                        loading={loadingChat}
                        icon="message-circle"
                        iconColor="text-grayscale-20"
                        style={tw`bg-grayscale-100`}
                        textStyle={tw`text-grayscale-20 font-semibold text-base`}
                        title="Converse com o vendedor"
                        onPress={talkToTheSeller}
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
                                {product.state || "Estado não disponível"}
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
                                {product.city || "Cidade não disponível"}
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
                                {product.neighborhood ||
                                    "Bairro não disponível"}
                            </Text>
                        </View>
                    </View>

                    <Divider />

                    <CardSeller sellerId={product?.seller_id} />

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
                                    ({comments?.length})
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
                                    {product.rate}
                                </Text>
                            </View>
                        </View>

                        <ScrollView
                            horizontal
                            pagingEnabled
                            contentContainerStyle={tw`flex-row items-center gap-x-3`}
                        >
                            {comments?.map((comment, index) => (
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
                            onPress={() =>
                                router.push(`/reviews/${product.seller_id}`)
                            }
                        />
                    </View>

                    <Footer />
                </View>
            </ScrollView>
        </View>
    );
};

export default Product;
