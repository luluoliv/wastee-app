import apiService from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../utils/setToken";
import axios from "axios";

interface AuthResponse {
    access: string;
    refresh?: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    name: string;
    email: string;
}

interface ConfirmCredentials {
    confirmation_code: string;
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh");
        const response = await apiService.post<AuthResponse>(
            "login/",
            credentials
        );
        const { access, refresh } = response.data;

        await setToken(access);

        if (refresh) {
            await AsyncStorage.setItem("refresh", refresh);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Falhou ao logar. Por favor, cheque suas credenciais."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const register = async (
    credentials: RegisterCredentials
): Promise<void> => {
    try {
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh");

        await apiService.post<AuthResponse>("register/", credentials);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error);
                const { email, name } = error.response.data;
                throw new Error(email || name);
            } else {
                throw new Error("Erro de rede. Tente novamente.");
            }
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const confirm = async (
    credentials: ConfirmCredentials
): Promise<void> => {
    try {
        const response = await apiService.post<AuthResponse>(
            "confirm/",
            credentials
        );

        const { access, refresh } = response.data;

        await setToken(access);

        if (refresh) {
            await AsyncStorage.setItem("refresh", refresh);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Não foi possível confirmar o código. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};