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
import { UserProvider } from "@/src/contexts/UserContext";
import { AuthProvider } from "@/src/contexts/AuthContext";

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
        <UserProvider>
            <AuthProvider>
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
                            <Stack.Screen name="new-product/[id]" />
                            <Stack.Screen name="password/[id]" />
                            <Stack.Screen name="tutorial" />
                            <Stack.Screen name="(tabs)" />
                            <Stack.Screen name="search" />
                            <Stack.Screen name="category/[id]" />
                            <Stack.Screen name="product/[id]" />
                            <Stack.Screen name="products-seller/[id]" />
                            <Stack.Screen name="reviews/[id]" />
                            <Stack.Screen name="review-seller/[id]" />
                            <Stack.Screen name="user/[user]" />
                            <Stack.Screen name="settings/[id]" />
                            <Stack.Screen name="seller/[id]" />
                            <Stack.Screen name="sell-forms" />
                        </Stack>
                    </GestureHandlerRootView>
                </PaperProvider>
            </AuthProvider>
        </UserProvider>
    );
}
