import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
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

    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<
        number | undefined
    >();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (form: any) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category_id", form.selectedCategory);
        formData.append("original_price", form.original_price);
        formData.append('seller_id', id);

        selectedImages.forEach((image, index) => {
            const file = {
                uri: image, // This should be the path to the image
                type: "image/jpeg", // Adjust the type accordingly
                name: `photo_${index}.jpg`, // Name of the file
            };
            // Use the `append` method of FormData correctly
            console.log(file);
            formData.append(`images`, file as any); // Cast to any to avoid type errors
        });

        console.log(selectedImages);

        console.log(formData);

        try {
            await createProduct(formData);
        } catch (error) {
            console.log(error);
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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 3,
        });

        if (!result.canceled) {
            const newImages = result.assets.map((asset) => asset.uri);
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const removeImage = (imageUri: string) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((uri) => uri !== imageUri)
        );
    };

    const options = [
        { label: "Smartphones", value: 3 },
        { label: "Tablets", value: 4 },
        { label: "Computadores", value: 5 },
        { label: "Monitores", value: 6 },
        { label: "Impressoras", value: 7 },
        { label: "Periféricos", value: 8 },
        { label: "Câmeras", value: 9 },
        { label: "Videogames", value: 10 },
    ];

    return (
        <ScrollView style={tw`flex-1 w-full h-full py-10 bg-grayscale-20`}>
            <View
                style={tw`flex-row items-center justify-end p-4 bg-grayscale-20`}
            >
                <TouchableOpacity onPress={() => router.push(`/perfil`)}>
                    <Feather name={"x-circle"} size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={tw`px-5 gap-y-5`}>
                <View>
                    <Text style={tw`font-medium text-xl text-grayscale-100`}>
                        Crie um título e adicione informações ao seu produto
                    </Text>
                    <Text style={tw`font-medium text-base text-grayscale-60`}>
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
                    <Text style={tw`font-medium text-xl text-grayscale-100`}>
                        Mostre o seu produto
                    </Text>
                    <Text style={tw`font-medium text-base text-grayscale-60`}>
                        Até 6 fotos nos formatos jpg e png. Fotos nítidas ajudam
                        a vender mais rápido.
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
                        {selectedImages.map((imageUri, index) => (
                            <View key={index} style={tw`relative`}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={tw`w-48 h-48 rounded-xl`}
                                />
                                <TouchableOpacity
                                    onPress={() => removeImage(imageUri)}
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
    );
};

export default NewProduct;
