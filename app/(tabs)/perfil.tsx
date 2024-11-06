import React, { useEffect, useState } from "react";
import tw from "@/src/lib/tailwind";

import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Href, useRouter } from "expo-router";
import Header from "@/src/components/header";
import Avatar from "@/src/components/avatar";
import Footer from "@/src/components/footer";
import { useUser } from "@/src/contexts/UserContext";
import Button from "@/src/components/button";
import Divider from "@/src/components/divider";
import {
    getProductBySellerId,
    ProductResponse,
} from "@/src/service/productsService";
import {
    getSellersByUserId,
    SellerResponse,
} from "@/src/service/sellerService";
import Item from "@/src/components/item";

export default function Perfil() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [seller, setSeller] = useState<Partial<SellerResponse>>({});

    const { user } = useUser();

    const fetchData = async () => {
        if (user?.user_type !== "seller") return;

        setIsLoading(true);
        try {
            const sellerResponse = await getSellersByUserId(user?.id);

            setSeller(sellerResponse);

            const productsResponse = await getProductBySellerId(
                sellerResponse.id
            );
            setProducts(productsResponse);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        <View style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <Header
                onMorePress={() =>
                    router.replace(
                        `/settings/${user?.id}` as Href<`/password/${string}`>
                    )
                }
            />
            <ScrollView>
                <View style={tw`px-5 gap-y-5`}>
                    <View style={tw`flex-row items-center gap-x-3`}>
                        <Avatar user={user?.name} />
                        <View style={tw`flex flex-col`}>
                            <Text
                                style={tw`font-semibold text-xl text-left text-grayscale-100`}
                            >
                                {user?.name}
                            </Text>
                            <Text
                                style={tw`font-medium text-base text-left text-grayscale-100`}
                            >
                                {user?.email}
                            </Text>
                        </View>
                    </View>
                    {user?.user_type == "seller" ? null : (
                        <Button
                            loading={isLoading}
                            onPress={() => router.navigate("/sell-forms")}
                            icon="user-plus"
                            title="Quero me tornar um vendedor"
                            style={tw`bg-grayscale-100`}
                            textStyle={tw`text-grayscale-20`}
                        />
                    )}
                    {user?.user_type == "seller" && (
                        <>
                            <Divider />
                            <View
                                style={tw`flex-row items-center justify-between`}
                            >
                                <Text
                                    style={tw`font-medium text-grayscale-80 text-xl`}
                                >
                                    Produtos
                                </Text>
                                <Text
                                    style={tw`font-medium text-grayscale-60 text-xl`}
                                >
                                    ({products.length})
                                </Text>
                            </View>
                            <View style={tw`flex flex-col gap-y-3`}>
                                <ScrollView
                                    horizontal
                                    pagingEnabled
                                    contentContainerStyle={tw`flex-row items-center gap-x-3`}
                                >
                                    {products.length > 0 ? (
                                        products.map((product, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() =>
                                                    router.push(
                                                        `/product/${product.id}`
                                                    )
                                                }
                                            >
                                                <Item
                                                    fetchProduct={fetchData}
                                                    likable
                                                    data={product}
                                                />
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        <Text
                                            style={tw`text-grayscale-60 font-medium text-base`}
                                        >
                                            Nenhum produto postado ainda.
                                        </Text>
                                    )}
                                </ScrollView>
                                {products.length > 0 && (
                                    <Button
                                        title="Ver produtos"
                                        style={tw`bg-grayscale-40`}
                                        textStyle={tw`text-grayscale-100`}
                                        onPress={() =>
                                            router.push(
                                                `/products-seller/${seller.id}`
                                            )
                                        }
                                    />
                                )}

                                <Button
                                    loading={isLoading}
                                    onPress={() =>
                                        router.push(
                                            `/new-product/${seller.id}`
                                        )
                                    }
                                    icon="plus-circle"
                                    title="Adicionar produto"
                                    style={tw`bg-grayscale-100`}
                                    textStyle={tw`text-grayscale-20`}
                                />
                            </View>
                            <Divider />
                            <View style={tw`flex-col gap-y-2`}>
                                <Text
                                    style={tw`text-grayscale-80 font-medium text-xl`}
                                >
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
                        </>
                    )}
                </View>

                <Footer />
            </ScrollView>
        </View>
    );
}
