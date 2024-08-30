import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import tw from "twrnc";

import Button from "@/src/components/button";
import Input from "@/src/components/input";
import Title from "@/src/components/title";

const Login = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
      <Title />
      <Text style={tw`text-md text-white`}>Bem-vindo!</Text>
      <View style={tw`w-90 flex flex-col gap-y-2`}>
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
        <Button onPress={() => console.log("click")} title="Entrar" />
        <Text style={tw`text-gray-600 text-center`}>
          Não possui conta?
          <Text
            style={tw`text-white`}
            onPress={() => router.replace("/register")}
          >{" "}Cadastre-se
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
