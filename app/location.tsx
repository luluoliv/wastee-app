import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import tw from "@/src/lib/tailwind";
import Header from "@/src/components/header";
import Input from "@/src/components/input";
import { useForm, Controller } from "react-hook-form";
import Button from "@/src/components/button";
import { createSeller, NewSeller } from "@/src/service/sellerService";
import { RouteProp, useRoute } from "@react-navigation/native";
import { transformDateToISO } from "@/src/utils/transformDateToISO";
import { useUser } from "@/src/contexts/UserContext";

type LocationRouteParams = {
    cpf: string;
    birthDate: string;
    selectedRG: string;
    selectedSelfie: string;
};

const Location = () => {
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const route =
        useRoute<RouteProp<{ params: LocationRouteParams }, "params">>();
    const { cpf, birthDate, selectedRG, selectedSelfie } = route.params;
    const { user } = useUser();

    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm<NewSeller>();

    const isFormComplete =
        watch("postal_code") &&
        watch("state") &&
        watch("city") &&
        watch("neighborhood") &&
        termsAccepted;

    const onSubmit = async (form: NewSeller) => {
        const parsedRG = JSON.parse(selectedRG);
        const parsedSelfie = JSON.parse(selectedSelfie);

        const data = new FormData();

        data.append("postal_code", form.postal_code.replace(/\D/g, "")); // Clean postal code
        data.append("cpf", cpf); // Append CPF from params
        data.append("birth_date", transformDateToISO(birthDate)); // Convert birth date to ISO format
        data.append("state", form.state); // Append state
        data.append("city", form.city); // Append city
        data.append("neighborhood", form.neighborhood); // Append neighborhood
        data.append("user", "10"); // User ID (example)

        // Append RG and Selfie as files
        data.append("rg", {
            uri: parsedRG.uri,
            name: parsedRG.name,
            type: parsedRG.type,
        });

        data.append("selfie_document", {
            uri: parsedSelfie.uri,
            name: parsedSelfie.name,
            type: parsedSelfie.type,
        });

        console.log(data);

        setIsLoading(true);
        try {
            await createSeller(data);
        } catch (error: any) {
            Alert.alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={tw`w-full flex-1 pt-10 bg-grayscale-20`}>
            <Header
                title="Se torne um vendedor"
                titleStyle={tw`text-grayscale-100`}
                moreIconName=""
            />
            <ScrollView contentContainerStyle={tw`flex-grow px-5`}>
                <Text style={tw`font-medium text-grayscale-100 text-xl`}>
                    Endereço
                </Text>

                <View style={tw`gap-y-3 mt-5`}>
                    <Controller
                        control={control}
                        name="postal_code"
                        rules={{ required: "CEP é obrigatório" }}
                        render={({ field }) => (
                            <Input
                                mask="99999-999"
                                control={control}
                                label="CEP"
                                {...field}
                                error={errors.postal_code?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="state"
                        rules={{ required: "Estado é obrigatório" }}
                        render={({ field }) => (
                            <Input
                                control={control}
                                label="Estado"
                                {...field}
                                error={errors.state?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="city"
                        rules={{ required: "Cidade é obrigatória" }}
                        render={({ field }) => (
                            <Input
                                control={control}
                                label="Cidade"
                                {...field}
                                error={errors.city?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="neighborhood"
                        rules={{ required: "Bairro é obrigatório" }}
                        render={({ field }) => (
                            <Input
                                control={control}
                                label="Bairro"
                                {...field}
                                error={errors.neighborhood?.message}
                            />
                        )}
                    />
                </View>
            </ScrollView>

            <View
                style={tw`absolute bottom-0 w-full px-5 py-5 bg-grayscale-20`}
            >
                <View style={tw`flex-row gap-x-2 items-center mb-5`}>
                    <TouchableOpacity
                        onPress={() => setTermsAccepted(!termsAccepted)}
                    >
                        <View
                            style={tw`w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center`}
                        >
                            {termsAccepted && (
                                <View
                                    style={tw`w-3 h-3 bg-grayscale-100 rounded-full`}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                    <Text style={tw`text-grayscale-100`}>
                        Eu li e concordo com os{" "}
                        <Text style={tw`text-primary`}>Termos de Serviço</Text>
                        {"\n"}e{" "}
                        <Text style={tw`text-primary`}>
                            Política de Privacidade
                        </Text>{" "}
                        de ser um vendedor.
                    </Text>
                </View>

                <Button
                    loading={isLoading}
                    onPress={handleSubmit(onSubmit)}
                    title="Finalizar"
                    disabled={!isFormComplete || isLoading}
                    style={tw`${
                        isFormComplete ? "bg-grayscale-100" : "bg-grayscale-60"
                    }`}
                    textStyle={tw`text-grayscale-20`}
                />
            </View>
        </View>
    );
};

export default Location;
