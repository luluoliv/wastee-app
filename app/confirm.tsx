import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    Alert,
} from "react-native";
import { TextInput as RNTextInput } from "react-native";

import tw from "@/src/lib/tailwind";
import { blurBottom } from "@/src/utils/imports";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { confirm } from "../src/service/authService";

const Confirm = () => {
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const [code, setCode] = useState(Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    
    const inputRefs = useRef<(RNTextInput | null)[]>([]);

    const handleInputChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;

        setCode(newCode);

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (
            e.nativeEvent.key === "Backspace" &&
            code[index] === "" &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleConfirmCode();
        }
    }, [code]);

    const handleConfirmCode = async () => {
        const joinedCode = code.join('');
        setIsLoading(true);
        try {
            const response = await confirm({ confirmation_code: joinedCode, email });
            const userId: string = response.user_id; 
            Alert.alert("Sucesso!", "Código confirmado com sucesso.");
            router.push(`/password/${userId}` as Href<`/password/${string}`>);
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao confirmar o código."); 
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={tw`flex-1 pt-20 px-12 gap-y-20 bg-grayscale-20`}>
            <Image
                source={blurBottom}
                style={tw`absolute bottom-0 left-0 right-0 h-1/4`}
                resizeMode="cover"
            />

            <Text style={tw`text-center text-primary text-3xl font-bold italic`}>
                Wastee
            </Text>

            <View style={tw`flex flex-col items-center gap-y-5`}>
                <Text style={tw`text-xl text-center font-medium text-grayscale-100`}>
                    Confirme seu e-mail.
                </Text>
                <Text style={tw`text-base text-center font-normal text-grayscale-100`}>
                    Insira o código enviado para{" "}
                    <Text style={tw`text-base text-center font-semibold text-grayscale-100`}>
                        {email}
                    </Text>
                </Text>
                <View style={tw`flex-row justify-between w-full items-center gap-y-4`}>
                    <Text style={tw`text-sm text-center font-medium text-grayscale-100`}>
                        {email}
                    </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={tw`text-sm text-center font-medium text-primary`}>
                            Alterar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={tw`flex-row justify-between items-center gap-x-2`}>
                    {Array(6).fill(0).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={tw`w-12 h-16 bg-transparent text-grayscale-100 border border-grayscale-60 text-center text-3xl rounded-lg`}
                            keyboardType="numeric"
                            maxLength={1}
                            value={code[index]}
                            onChangeText={(value) => handleInputChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            editable={!isLoading} 
                        />
                    ))}
                </View>
                {isLoading && <Text style={tw`text-primary`}>Carregando...</Text>}
            </View>
        </View>
    );
};

export default Confirm;
