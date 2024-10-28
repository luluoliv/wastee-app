import apiService from "./apiService";
import axios from "axios";
import { ProductResponse } from "./productsService";

export interface FavoriteResponse {
    id: string;
    user: string;
    product: string;
    created_at: string;
}

interface NewFavorite {
    user: string | undefined;
    product: string | undefined;
}

export const getFavorites = async (): Promise<ProductResponse[]> => {
    try {
        const response = await apiService.get<ProductResponse[]>("favorites/");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar a lista de favoritos. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const addFavorite = async (
    favorite: NewFavorite | undefined
): Promise<FavoriteResponse> => {
    try {
        const response = await apiService.post<FavoriteResponse>(
            "favorites/",
            favorite
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao adicionar o produto aos favoritos. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const removeFavorite = async (productId: string): Promise<void> => {
    try {
        await apiService.delete(`favorites/${productId}/`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao remover o favorito. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
