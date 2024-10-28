import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, Image, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { blurBottom } from "@/src/utils/imports";
import tw from "@/src/lib/tailwind";
import Input from "@/src/components/input";
import Button from "@/src/components/button";
import { setPassword } from "@/src/service/authService";

const Password = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useLocalSearchParams<{ id: string }>();

    const {
        control,
        handleSubmit,
        getValues,
        setError,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (data: { password: string; email: string }) => {
        setIsLoading(true);

        try {
            await setPassword({ password: data.password, email: data.email, user_id: id });
            router.replace("/tutorial");
        } catch (error: any) {
            if (error.message) {
                if (error.message) {
                    setError("password", { type: "manual", message: error.message});
                } else {
                    Alert.alert("Erro", "Erro ao registrar senha. Tente novamente.");
                }
            } else {
                Alert.alert("Erro", "Erro desconhecido. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={tw`flex-1 pt-20 gap-y-20 bg-grayscale-20`}>
            <Image
                source={blurBottom}
                style={tw`absolute bottom-0 left-0 right-0 h-1/4`}
                resizeMode="cover"
            />
            <Text
                style={tw`text-center text-primary text-3xl font-bold italic`}
            >
                Wastee
            </Text>
            <Text
                style={tw`text-center text-xl font-medium text-grayscale-100`}
            >
                Adicione uma senha e {"\n"} finalize sua conta.
            </Text>

            <View
                style={tw`flex-1 w-full px-4 flex flex-col items-center gap-y-4`}
            >
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Campo obrigatório",
                    }}
                    render={({ field }) => (
                        <Input
                            control={control}
                            error={errors?.password?.message}
                            label="Senha"
                            secureTextEntry
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: "Confirmação de senha é obrigatória",
                        validate: (value) =>
                            value === getValues("password") ||
                            "As senhas não coincidem",
                    }}
                    render={({ field }) => (
                        <Input
                            control={control}
                            error={errors?.confirmPassword?.message}
                            label="Confirmar senha"
                            secureTextEntry
                            {...field}
                        />
                    )}
                />

                <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                    title="Confirmar"
                    loading={isLoading}
                />
            </View>
        </View>
    );
};

export default Password;
