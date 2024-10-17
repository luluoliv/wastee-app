import { View, Text, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import tw from "@/src/lib/tailwind";

import Header from "@/src/components/header";
import Input from "@/src/components/input";
import Button from "@/src/components/button";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Feather } from "@expo/vector-icons";
import InputData from "@/src/components/inputData";
import { checkAge } from "@/src/utils/checkAge";

const SellForm = () => {
    const router = useRouter();

    const [selectedRG, setSelectedRG] = useState<{
        uri: string;
        name: string;
        type: string;
        width: number;
        height: number;
        size: number;
    } | null>(null);

    const [selectedSelfie, setSelectedSelfie] = useState<{
        uri: string;
        name: string;
        type: string;
        width: number;
        height: number;
        size: number;
    } | null>(null);

    const [birthDate, setBirthDate] = useState<string | null>(null);

    const [loadingImageRG, setLoadingImageRG] = useState(false);
    const [loadingImageSelfie, setLoadingImageSelfie] = useState(false);

    const {
        control,
        watch,
        formState: { errors },
    } = useForm();

    const cpfValue = watch("cpf");

    const isFormComplete =
        cpfValue && birthDate && selectedRG && selectedSelfie;

    const pickImage = async (type: "RG" | "Selfie") => {
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
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const imageName = result.assets[0].fileName || "Imagem";
            const imageType = result.assets[0].type || "imagem";
            const imageWidth = result.assets[0].width;
            const imageHeight = result.assets[0].height;

            let imageSizeInMB = 0;
            const fileInfo = await FileSystem.getInfoAsync(imageUri);

            if (fileInfo.exists && fileInfo.size !== undefined) {
                imageSizeInMB = fileInfo.size / (1024 * 1024);
            } else {
                console.log(
                    "Imagem não existe ou informação do tamanho indiponível"
                );
            }

            const imageDetails = {
                uri: imageUri,
                name: imageName,
                type: imageType,
                width: imageWidth,
                height: imageHeight,
                size: imageSizeInMB,
            };

            if (type === "RG") {
                setLoadingImageRG(true);
                setSelectedRG(imageDetails);
                setLoadingImageRG(false);
            } else {
                setLoadingImageSelfie(true);
                setSelectedSelfie(imageDetails);
                setLoadingImageSelfie(false);
            }
        }
    };

    const removeImage = (type: "RG" | "Selfie") => {
        if (type === "RG") {
            setSelectedRG(null);
        } else {
            setSelectedSelfie(null);
        }
    };

    const navigateToNextPage = () => {
        if (!checkAge(birthDate)) {
            alert("Você deve ter pelo menos 18 anos para prosseguir.");
            return;
        }
        router.push({
            pathname: "/location",
            params: {
                cpf: cpfValue.replace(/\D/g, ""),
                birthDate: birthDate,
                selectedRG: JSON.stringify(selectedRG),
                selectedSelfie: JSON.stringify(selectedSelfie),
            },
        });
    };

    return (
        <View style={tw`w-full flex-1 pt-10 bg-grayscale-20`}>
            <Header
                title="Se torne um vendedor"
                titleStyle={tw`text-grayscale-100`}
                moreIconName=""
            />

            <View style={tw`w-full px-5 gap-y-5`}>
                <Text style={tw`font-medium text-grayscale-100 text-xl`}>
                    Identificação Fiscal
                </Text>
                <View style={tw`gap-y-3`}>
                    <Controller
                        control={control}
                        name="cpf"
                        render={({ field }) => (
                            <Input
                                name="cpf"
                                control={control}
                                label="CPF"
                                mask="999.999.999-99"
                            />
                        )}
                    />
                    <InputData
                        onValueChange={(value: Date | null | undefined) => {
                            setBirthDate(
                                value ? value.toLocaleDateString() : null
                            );
                        }}
                        valuePlaceholder="Data de nascimento"
                    />
                </View>

                <Text style={tw`font-medium text-grayscale-100 text-xl`}>
                    Documento de identidade
                </Text>

                <Button
                    title="Frente e verso (RG)"
                    style={tw`bg-grayscale-40`}
                    textStyle={tw`text-grayscale-100`}
                    onPress={() => pickImage("RG")}
                />
                {selectedRG && (
                    <View style={tw`flex flex-row items-center gap-x-2`}>
                        {loadingImageRG ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Image
                                source={{ uri: selectedRG.uri || "" }}
                                style={tw`w-12 h-12 rounded-xl`}
                            />
                        )}
                        <View style={tw`flex-1`}>
                            <Text
                                style={tw`text-grayscale-100 font-semibold text-base`}
                            >
                                {selectedRG?.name
                                    ? `${selectedRG.name}`
                                    : "Imagem indisponível"}
                            </Text>
                            <Text
                                style={tw`text-grayscale-60 font-normal text-base`}
                            >
                                {selectedRG?.size
                                    ? `${selectedRG.size.toFixed(2)} MB`
                                    : "Tamanho indisponível"}
                            </Text>
                            {!selectedRG && (
                                <Text
                                    style={tw`text-grayscale-60 font-normal text-base`}
                                >
                                    <Feather
                                        name="alert-circle"
                                        size={16}
                                        color="grey"
                                    />{" "}
                                    Dados indisponíveis
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={tw`ml-2`}
                            onPress={() => removeImage("RG")}
                        >
                            <Feather name="x-circle" size={16} color="grey" />
                        </TouchableOpacity>
                    </View>
                )}

                <Button
                    title="Selfie com o documento"
                    style={tw`bg-grayscale-40`}
                    textStyle={tw`text-grayscale-100`}
                    onPress={() => pickImage("Selfie")}
                />
                {selectedSelfie && (
                    <View style={tw`flex flex-row items-center gap-x-2`}>
                        {loadingImageSelfie ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Image
                                source={{ uri: selectedSelfie.uri || "" }}
                                style={tw`w-12 h-12 rounded-xl`}
                            />
                        )}
                        <View style={tw`flex-1`}>
                            <Text
                                style={tw`text-grayscale-100 font-semibold text-base`}
                            >
                                {selectedSelfie?.name
                                    ? `${selectedSelfie.name}`
                                    : "Imagem indisponível"}
                            </Text>
                            <Text
                                style={tw`text-grayscale-60 font-normal text-base`}
                            >
                                {selectedSelfie?.size
                                    ? `${selectedSelfie.size.toFixed(2)} MB`
                                    : "Tamanho indisponível"}
                            </Text>
                            {!selectedSelfie && (
                                <Text
                                    style={tw`text-grayscale-60 font-normal text-base`}
                                >
                                    <Feather
                                        name="alert-circle"
                                        size={16}
                                        color="grey"
                                    />{" "}
                                    Dados indisponíveis
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={tw`ml-2`}
                            onPress={() => removeImage("Selfie")}
                        >
                            <Feather name="x-circle" size={16} color="grey" />
                        </TouchableOpacity>
                    </View>
                )}

                <Button
                    disabled={!isFormComplete}
                    title="Continuar"
                    style={tw`${
                        isFormComplete ? "bg-grayscale-100" : "bg-grayscale-60"
                    } mt-5`}
                    textStyle={tw`text-grayscale-20`}
                    onPress={navigateToNextPage}
                />
            </View>
        </View>
    );
};

export default SellForm;
