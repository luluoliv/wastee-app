import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import theme from "@/src/utils/theme";

import {
    useFonts,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import "../src/styles/global.css";
import "../src/styles/output.css";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_300Light,
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
        <PaperProvider theme={theme}>
            <GestureHandlerRootView>
                <StatusBar />
                <Stack
                    initialRouteName="index"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="initial" />
                    <Stack.Screen name="register" />
                    <Stack.Screen name="confirm" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="product/[id]" />
                    <Stack.Screen name="reviews/[id]" />
                    <Stack.Screen name="seller/[id]" />
                </Stack>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}
