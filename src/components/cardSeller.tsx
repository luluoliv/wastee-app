import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import tw from "../lib/tailwind";
import Button from "./button";
import Avatar from "./avatar";
import { getSellerById, SellerResponse } from "../service/sellerService";

interface CardSellerProps {
    sellerId: string | undefined;
}

const CardSeller: React.FC<CardSellerProps> = ({ sellerId }) => {
    const router = useRouter();

    const [seller, setSeller] = useState<SellerResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSeller = async () => {
        setLoading(true);
        try {
            const response = await getSellerById(sellerId);
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

    if (loading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={tw`mt-2 text-grayscale-100`}>Carregando vendedor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={tw`border border-red-500 rounded-xl p-3`}>
                <Text style={tw`text-red-500 font-medium text-base`}>
                    {error}
                </Text>
            </View>
        );
    }


    if (!seller?.id) {
        return (
            <View style={tw`border border-grayscale-40 rounded-xl p-3`}>
                <Text style={tw`text-grayscale-80 font-medium text-base`}>
                    Vendedor não encontrado
                </Text>
            </View>
        );
    }

    return (
        <View style={tw`border border-grayscale-40 rounded-xl`}>
            <View style={tw`bg-grayscale-40 p-3 items-center`}>
                <Avatar user={seller.user.name} />
            </View>
            <View style={tw`w-full flex-row items-center justify-between p-3`}>
                <View>
                    <Text style={tw`text-grayscale-100 font-medium text-base`}>
                        {seller.user.name}
                    </Text>
                    <Text style={tw`text-grayscale-80 font-medium text-sm`}>
                        <Feather
                            size={12}
                            name="shopping-bag"
                            color="#dfe6f5"
                        />{" "}
                        {seller?.products.length}{" "}
                        {seller?.products.length > 1 ? "produtos" : "produto"} à venda
                    </Text>
                </View>
                <Button
                    iconColor="text-grayscale-20"
                    style={tw`bg-grayscale-100 w-16 p-2`}
                    textStyle={tw`text-grayscale-20 font-semibold text-base`}
                    title="Perfil"
                    onPress={() => router.push(`/seller/${seller?.id}`)}
                />
            </View>
        </View>
    );
};

export default CardSeller;
