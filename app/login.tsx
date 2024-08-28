import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

import Button from "@/src/components/button";
import Input from "@/src/components/input";

const Login = () => {
    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
            <View style={tw`w-90`}>
                <Input placeholder="E-mail" type="email" />
                <Input placeholder="Senha" />
                <Button onPress={() => console.log("click")} title="Entrar" />
            </View>
        </View>
    );
};

export default Login;
