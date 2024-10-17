import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "@/src/lib/tailwind";
import Header from "@/src/components/header";
import Input from "@/src/components/input";
import { useForm, Controller } from "react-hook-form";
import Button from "@/src/components/button";

interface SellerFormInputs {
    postal_code: string;
    state: string;
    city: string;
    neighborhood: string;
    user: string | number;
}

const Location = () => {
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm<SellerFormInputs>();

    const isFormComplete =
        watch("postal_code") &&
        watch("state") &&
        watch("city") &&
        watch("neighborhood") &&
        termsAccepted;

    const onSubmit = async (data: SellerFormInputs) => {};

    return (
        <View style={tw`w-full flex-1 pt-10 gap-y-5 bg-grayscale-20`}>
            <Header
                title="Se torne um vendedor"
                titleStyle={tw`text-grayscale-100`}
                moreIconName=""
            />
            <View style={tw`w-full px-5 gap-y-5`}>
                <Text style={tw`font-medium text-grayscale-100 text-xl`}>
                    Endereço
                </Text>

                <View style={tw`gap-y-3`}>
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

                <View style={tw``}>
                    <View style={tw`flex-row gap-x-2 items-center`}>
                        <TouchableOpacity
                            onPress={() => setTermsAccepted(true)}
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
                            {"\n"} e <Text style={tw`text-primary`}>Política de Privacidade</Text> de ser um vendedor.
                        </Text>
                    </View>
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        title="Finalizar"
                        disabled={!isFormComplete}
                        style={tw`${
                            isFormComplete
                                ? "bg-grayscale-100"
                                : "bg-grayscale-60"
                        } mt-5`}
                        textStyle={tw`text-grayscale-20`}
                    />
                </View>
            </View>
        </View>
    );
};

export default Location;
