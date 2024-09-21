import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import tw from "@/src/lib/tailwind";
import Button from "@/src/components/button";
import { bag, cart, coupon, robot, verified } from "@/src/utils/imports";

const Tutorial = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Bem-vindo ao Wastee",
            content:
                "Explore o app para comprar e vender produtos eletrônicos reciclados de forma fácil e segura!",
            image: robot,
        },
        {
            title: "Compre produtos",
            content:
                "Navegue pelas nossas categorias de produtos e negocie com os vendedores.",
            image: bag,
        },
        {
            title: "Venda produtos",
            content:
                "Torne-se um vendedor e receba avaliações positivas subindo sua confiança no app.",
            image: cart,
        },
        {
            title: "Cupons de desconto",
            content:
                "Quanto mais você compra, mais cupons você ganha! Use esses cupons para economizar ainda mais, enquanto ajuda os vendedores.",
            image: coupon,
        },
        {
            title: "Plano Premium",
            content:
                "Desfrute de navegação sem anúncios e torne-se um vendedor de selo verificado com o plano Premium!",
            image: verified,
        },
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };
    return (
        <View style={tw`flex-1 py-16 px-5 gap-y-16 bg-grayscale-20`}>
            <TouchableOpacity
                onPress={() => router.replace("/home")}
                style={tw`z-10`}
            >
                <Text
                    style={tw`font-semibold text-base text-grayscale-100 text-right`}
                >
                    Pular
                </Text>
            </TouchableOpacity>
            <View style={tw`gap-y-5`}>
                <Text
                    style={tw`font-medium text-2xl text-center text-grayscale-80`}
                >
                    {steps[step].title}
                </Text>
                <Text
                    style={tw`font-medium text-xl text-center text-grayscale-100`}
                >
                    {steps[step].content}
                </Text>
            </View>
            <LinearGradient
                colors={["#3573FB52", "#0C0C1100"]}
                style={tw`absolute inset-0`}
                start={{ x: 0.5, y: 0.5 }}
                end={{ x: 1, y: 2 }}
            />

            <Image
                source={steps[step].image}
                style={tw`w-56 h-56 p-10 m-auto`}
            />
            <Button
                title={`${step === steps.length - 1 ? "Concluir" : "Próximo"}`}
                onPress={
                    step === steps.length - 1
                        ? () => router.replace("/home")
                        : nextStep
                }
            />
        </View>
    );
};

export default Tutorial;
