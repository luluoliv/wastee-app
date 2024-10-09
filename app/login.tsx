import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import Button from "@/src/components/button";
import Input from "@/src/components/input";
import { blurBottom } from "@/src/utils/imports";

import { login } from "../src/service/authService";
import { useUser } from "@/src/contexts/UserContext";

interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useUser();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const response = await login({ email: data.email, password: data.password });

            setUser(response.user);
            router.replace("/home");
        } catch (error: any) {
            Alert.alert(
                "Erro de login",
                error.message || "Não foi possível fazer o login."
            );
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
                Bem-vindo!
            </Text>

            <View
                style={tw`flex-1 w-full px-4 flex flex-col items-center gap-y-4`}
            >
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "E-mail é obrigatório",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "E-mail inválido",
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            control={control}
                            error={errors?.email?.message}
                            label="E-mail"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Senha é obrigatória" }}
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

                <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                    title="Entrar"
                    loading={isLoading}
                />

                <Text style={tw`text-grayscale-60 text-center`}>
                    Não possui conta?
                    <Text
                        style={tw`text-grayscale-100`}
                        onPress={() => router.replace("/register")}
                    >
                        {" "}
                        Cadastre-se
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;
