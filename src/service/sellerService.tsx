import apiService from "./apiService";
import axios from "axios";

export interface SellerResponse {
    id: string;
    address: string;
    postal_code: string;
    state: string;
    city: string;
    neighborhood: string;
    created_at: string;
    user: number;
}

interface NewSeller {
    address: string;
    postal_code: string;
    state: string;
    city: string;
    neighborhood: string;
    user: number;
}

interface UpdateSeller {
    id: number;
    address?: string;
    postal_code?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
}

export const getSellerById = async (
    sellerId:  string | undefined
): Promise<SellerResponse> => {
    try {
        const response = await apiService.get<SellerResponse>(`sellers/${sellerId}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                "Erro ao buscar vendedor. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getSellersByUserId = async (
    userId: string | undefined
): Promise<SellerResponse> => {
    try {
        const response = await apiService.get<SellerResponse>(
            `sellers/by-user/${userId}`
        );        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                "Erro ao buscar vendedores por usuário. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getAllSellers = async (): Promise<SellerResponse[]> => {
    try {
        const response = await apiService.get<SellerResponse[]>("sellers/");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                "Erro ao buscar vendedores. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const createSeller = async (
    seller: NewSeller
): Promise<SellerResponse> => {
    try {
        const response = await apiService.post<SellerResponse>("sellers/", seller);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                "Erro ao criar vendedor. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const updateSeller = async (
    seller: UpdateSeller
): Promise<SellerResponse> => {
    try {
        const response = await apiService.put<SellerResponse>(
            `sellers/${seller.id}/`,
            seller
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                "Erro ao atualizar vendedor. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const deleteSeller = async (sellerId: number): Promise<void> => {
    try {
        await apiService.delete(`sellers/${sellerId}/`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                "Erro ao deletar vendedor. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
