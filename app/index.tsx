import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Image, Animated, Easing } from "react-native";
import tw from 'twrnc';

const icon = require("../assets/images/icon.png");

export default function SplashScreen() {
    const fadeAnim = new Animated.Value(1);  
    const router = useRouter()

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => router.replace('/initial'));
    }, [fadeAnim, router]);

    return (
        <View style={tw`flex-1 justify-center items-center bg-blue-500`}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <Image source={icon} style={tw`w-24 h-24`} />
            </Animated.View>
        </View>
    );
}
