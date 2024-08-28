import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import "../src/styles/global.css";
import "../src/styles/output.css";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <>
            <StatusBar style="dark" />
            <Stack
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" />
                <Stack.Screen name="Initial" />
            </Stack>
        </>
    );
}
