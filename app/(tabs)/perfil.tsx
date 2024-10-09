import React, { useEffect, useState } from "react";
import tw from "@/src/lib/tailwind";

import { View, StyleSheet, Text, Alert } from "react-native";
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

export default function Perfil() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ProductResponse[]>([]);

    const { user } = useUser();
    console.log(user);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getProductBySellerId(user?.id);
                setProducts(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        if (user?.user_type == "seller") {
            fetchProducts();
        }
    }, []);

    return (
        <View style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <Header
                onMorePress={() =>
                    router.replace(
                        `/settings/${user?.id}` as Href<`/password/${string}`>
                    )
                }
            />
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
                        onPress={() => router.replace("/sell-forms")}
                        icon="user-plus"
                        title="Quero me tornar um vendedor"
                        style={tw`bg-grayscale-100`}
                        textStyle={tw`text-grayscale-20`}
                    />
                )}
                {user?.user_type == "seller" && (
                    <>
                        <Divider />
                        <View style={tw`flex-row items-center justify-between`}>
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
                    </>
                )}
            </View>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins_600SemiBold_Italic",
    },
});
