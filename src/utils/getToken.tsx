import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem("access");
        const refresh = await AsyncStorage.getItem("refresh")
        if (token !== null) {
            return token;
        } else {
            return refresh;
        }
    } catch (error) {
        console.error("Erro ao encontrar token:", error);
        return null;
    }
};
