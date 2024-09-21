import React from "react";
import { View, Text, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

import tw from "@/src/lib/tailwind";
import Button from "@/src/components/button";
import Input from "@/src/components/input";
import { blurBottom } from "@/src/utils/imports";

const Register = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: any) => {
        console.log(data);
        router.push({
            pathname: "/confirm",
            params: { email: data.email },
        });
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
                Crie sua conta Wastee.
            </Text>

            <View
                style={tw`flex-1 w-full px-4 flex flex-col items-center gap-y-4`}
            >
                <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "Nome completo é obrigatório" }}
                    render={({ field }) => (
                        <Input
                            control={control}
                            error={errors?.fullName?.message}
                            label="Nome completo"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
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

                <Button
                    disabled={!isValid}
                    onPress={handleSubmit(onSubmit)}
                    title="Continuar"
                />

                <Text style={tw`text-grayscale-60 text-center`}>
                    Já possui conta?{" "}
                    <Text
                        style={tw`text-grayscale-100`}
                        onPress={() => router.replace("/login")}
                    >
                        Login
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Register;
