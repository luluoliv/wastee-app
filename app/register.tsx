import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import tw from "twrnc";

import Button from "@/src/components/button";
import Input from "@/src/components/input";
import Title from "@/src/components/title";

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
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    console.log(data);
    router.replace("/confirm");
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
      <Title />

      <Text style={tw`text-md text-white`}>Crie sua conta Wastee.</Text>

      <View style={tw`w-90 flex flex-col gap-y-2`}>
        <Controller
          control={control}
          rules={{ required: "Nome completo é obrigatório" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Nome completo"
                errorMessage={errors.fullName?.message}
                required
              />
            </View>
          )}
          name="fullName"
        />

        <Controller
          control={control}
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "E-mail inválido",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="E-mail"
                errorMessage={errors.email?.message}
                required
              />
            </View>
          )}
          name="email"
        />

        <Button disabled={!isValid} onPress={handleSubmit(onSubmit)} title="Continuar" />

        <Text style={tw`text-gray-600 text-center`}>
          Já possui conta?{" "}
          <Text style={tw`text-white`} onPress={() => router.replace("/login")}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;
