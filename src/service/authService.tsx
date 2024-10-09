import apiService from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../utils/setToken";
import axios from "axios";
import { User } from "../contexts/UserContext";

interface AuthResponse {
    access: string;
    refresh?: string;
    user: User | null;
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
    email: string | string[];
}

interface ConfirmResponse {
    message: string;
    user_id: string;
}
interface SetPasswordCredentials {
    email: string | string[];
    password: string;
    user_id: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh");
        const response = await apiService.post<AuthResponse>(
            "login/",
            credentials
        );
        const { access, refresh, user } = response.data;

        await setToken(access);

        if (refresh) {
            await AsyncStorage.setItem("refresh", refresh);
        }

        return { access, refresh, user };
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
): Promise<ConfirmResponse> => {
    try {
        const response = await apiService.post<ConfirmResponse>(
            "confirm/",
            credentials
        );
        return response.data;
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

export const setPassword = async (
    credentials: SetPasswordCredentials
): Promise<void> => {
    try {
        const { user_id, password, email } = credentials;
        const response = await apiService.put<AuthResponse>(
            `set-password/${user_id}/`,
            { password, email }
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
                    "Não foi possível registrar senha. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
