import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import Input from "@/src/components/input";
import Button from "@/src/components/button";
import InputDropdown from "@/src/components/inputDropdown";
import { createProduct } from "@/src/service/productsService";

const NewProduct = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<
        number | undefined
    >();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (form: any) => {
        setIsLoading(true);

        const images = selectedImages.map((image) => {
            return {
                uri: image.uri,
                type: image.type,
                name: image.name,
            };
        });

        const data ={
            ...form, 
            category_id: selectedCategory?.toString(),
            seller_id:  id.toString(),
            images: images,
        }        

        try {
            const response = await createProduct(data);

            if (response && response.product) {
                Alert.alert(response.message);
                router.push(`/product/${response.product.id}`);
            }
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const pickImages = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permissão para acessar galeria é necessária!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = result.assets.map((asset) => ({
                uri: asset.uri,
                name: asset.fileName, 
                type: asset.type,
            }));
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const removeImage = (imageUri: string) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((uri) => uri !== imageUri)
        );
    };

    const options = [
        { label: "Smartphones", value: 11 },
        { label: "Tablets", value: 12 },
        { label: "Computadores", value: 13 },
        { label: "Monitores", value: 14 },
        { label: "Impressoras", value: 15 },
        { label: "Periféricos", value: 16 },
        { label: "Câmeras", value: 17 },
        { label: "Videogames", value: 18 },
    ];

    return (
        <KeyboardAvoidingView
            style={tw`flex-1 w-full h-full`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={tw`flex-1 w-full py-10 bg-grayscale-20`}>
                <View
                    style={tw`flex-row items-center justify-end p-4 bg-grayscale-20`}
                >
                    <TouchableOpacity onPress={() => router.push(`/perfil`)}>
                        <Feather name={"x-circle"} size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={tw`px-5 gap-y-5`}>
                    <View>
                        <Text
                            style={tw`font-medium text-xl text-grayscale-100`}
                        >
                            Crie um título e adicione informações ao seu produto
                        </Text>
                        <Text
                            style={tw`font-medium text-base text-grayscale-60`}
                        >
                            Produtos mais completos vendem mais rápido.
                        </Text>
                    </View>
                    <InputDropdown
                        valuePlaceholder="Categoria"
                        onValueChange={(value) => setSelectedCategory(value)}
                        options={options}
                    />

                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <View>
                                <Input
                                    control={control}
                                    label="Título"
                                    {...field}
                                />
                                <Text
                                    style={tw`text-right font-medium text-sm text-grayscale-100`}
                                >
                                    {field.value?.length || 0}
                                    <Text
                                        style={tw`font-medium text-sm text-grayscale-60`}
                                    >
                                        /500
                                    </Text>
                                </Text>
                            </View>
                        )}
                        rules={{ required: "Título é obrigatório." }}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <View>
                                <Input
                                    control={control}
                                    label="Descrição do produto"
                                    {...field}
                                />
                                <Text
                                    style={tw`text-right font-medium text-sm text-grayscale-100`}
                                >
                                    {field.value?.length || 0}
                                    <Text
                                        style={tw`font-medium text-sm text-grayscale-60`}
                                    >
                                        /2000
                                    </Text>
                                </Text>
                            </View>
                        )}
                        rules={{ required: "Descrição é obrigatória." }}
                    />

                    <View>
                        <Text
                            style={tw`font-medium text-xl text-grayscale-100`}
                        >
                            Mostre o seu produto
                        </Text>
                        <Text
                            style={tw`font-medium text-base text-grayscale-60`}
                        >
                            Até 6 fotos nos formatos jpg e png. Fotos nítidas
                            ajudam a vender mais rápido.
                        </Text>
                    </View>

                    <Button
                        onPress={pickImages}
                        title="Adicionar fotos"
                        style={tw`bg-grayscale-40`}
                    />

                    {selectedImages.length > 0 && (
                        <ScrollView
                            horizontal
                            pagingEnabled
                            contentContainerStyle={tw`flex-row items-center gap-x-3`}
                        >
                            {selectedImages.map((image, index) => (
                                <View key={index} style={tw`relative`}>
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={tw`w-48 h-48 rounded-xl`}
                                    />
                                    <TouchableOpacity
                                        onPress={() => removeImage(image.uri)}
                                        style={tw`absolute flex-row bottom-2 right-2 bg-grayscale-20 bg-opacity-50 p-1 rounded-full`}
                                    >
                                        <Feather
                                            name="trash"
                                            size={18}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {selectedImages.length < 6 && (
                                <View
                                    style={tw`w-48 h-48 rounded-xl border-dotted border border-grayscale-60 justify-center items-center`}
                                ></View>
                            )}
                        </ScrollView>
                    )}
                    {selectedImages.length > 0 && (
                        <Text
                            style={tw`text-right font-medium text-base text-grayscale-100`}
                        >
                            {selectedImages.length}
                            <Text
                                style={tw`font-medium text-base text-grayscale-60`}
                            >
                                /6
                            </Text>
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="original_price"
                        render={({ field }) => (
                            <View style={tw`gap-y-1`}>
                                <Input
                                    control={control}
                                    label="Valor de revenda"
                                    {...field}
                                />
                                <Text
                                    style={tw`font-medium text-sm text-grayscale-60`}
                                >
                                    Lembre-se, valores justos vendem mais.
                                </Text>
                            </View>
                        )}
                        rules={{ required: "Valor de revenda é obrigatório." }}
                    />

                    <Text style={tw`font-medium text-base text-grayscale-100`}>
                        Ao publicar, o endereço informado no seu cadastro de
                        vendedor aparecerá na página do produto.
                    </Text>
                    <Button
                        loading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                        title="Publicar"
                        style={tw`bg-grayscale-100 mb-20`}
                        textStyle={tw`text-grayscale-20`}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default NewProduct;
