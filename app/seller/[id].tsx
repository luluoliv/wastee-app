import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import Header from "@/src/components/header";
import Dropdown from "@/src/components/dropdown";
import Classification from "@/src/components/classification";
import Button from "@/src/components/button";
import Footer from "@/src/components/footer";
import Item from "@/src/components/item";
import { sellers } from "@/src/data/sellers";
import { items } from "@/src/data/items";
import ModalReport from "@/src/components/modalReport";

const Seller = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isReport, setIsReport] = useState(false);

    const router = useRouter();

    const seller = sellers.find((seller) => seller?.id === id);
    const products = items.filter((item) => item?.seller === id);

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

            <View style={tw`flex-col gap-y-5 px-5`}>
                <View style={tw`flex-row items-center gap-x-3`}>
                    <Image
                        source={{ uri: seller?.photo }}
                        style={tw`w-14 h-14 rounded-full`}
                    />
                    <View>
                        <Text
                            style={tw`text-grayscale-100 font-semibold text-xl`}
                        >
                            {seller?.name}
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
                    onPress={() => console.log("Converse com o vendedor")}
                />

                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`font-medium text-grayscale-80 text-xl`}>
                        Produtos
                    </Text>
                    <Text style={tw`font-medium text-grayscale-60 text-xl`}>
                        ({products.length})
                    </Text>
                </View>

                <View style={tw`flex-col gap-y-3`}>
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
                                        router.push(`/product/${product.id}`)
                                    }
                                >
                                    <Item likable data={product} />
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
                    {products.length > 0 && (
                        <Button
                            title="Ver produtos"
                            style={tw`bg-grayscale-40`}
                            onPress={() =>
                                router.push(`/products-seller/${id}`)
                            }
                        />
                    )}
                </View>

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
                            {seller?.location.state}
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
                            {seller?.location.city}
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
                            {seller?.location.neighborhood}
                        </Text>
                    </View>
                </View>
            </View>

            <Footer />
        </View>
    );
};

export default Seller;
