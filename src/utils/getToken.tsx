import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem("access");
        if (token !== null) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao encontrar token:", error);
        return null;
    }
};
