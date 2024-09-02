import { View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import React from "react";
import tw from "twrnc";

import Button from "@/src/components/button";
import Input from "@/src/components/input";
import Title from "@/src/components/title";

const Login = () => {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm();
  console.log('Control:', control, errors);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
      <Title />
      <Text style={tw`text-md text-white`}>Bem-vindo!</Text>
      <View style={tw`w-90 flex flex-col gap-y-2`}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="E-mail"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              label="Senha"
              {...field}
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Entrar" />
        <Text style={tw`text-gray-600 text-center`}>
          Não possui conta?
          <Text
            style={tw`text-white`}
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
