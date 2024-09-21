import { View, Text } from "react-native";
import React from "react";
import Header from "@/src/components/header";
import { useLocalSearchParams } from "expo-router";

const ProductsSeller = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Header />
        </View>
    );
};

export default ProductsSeller;
