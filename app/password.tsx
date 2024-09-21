import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { blurBottom } from "@/src/utils/imports";
import tw from "@/src/lib/tailwind";
import Input from "@/src/components/input";
import Button from "@/src/components/button";

const Password = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data: any) => {
        console.log(data);
        router.replace("/tutorial");
    };

    return (
        <View style={tw`flex-1 pt-20 gap-y-20 bg-grayscale-20`}>
            <Image
                source={blurBottom}
                style={tw`absolute bottom-0 left-0 right-0 h-1/4`}
                resizeMode="cover"
            />
            <Text style={tw`text-center text-primary text-3xl font-bold italic`}>
                Wastee
            </Text>
            <Text style={tw`text-center text-xl font-medium text-grayscale-100`}>
                Adicione uma senha e {"\n"} finalize sua conta.
            </Text>

            <View style={tw`flex-1 w-full px-4 flex flex-col items-center gap-y-4`}>
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
                            value === getValues("password") || "As senhas não coincidem",
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
                />
            </View>
        </View>
    );
};

export default Password;
