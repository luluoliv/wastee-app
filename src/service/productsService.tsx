import apiService from "./apiService";
import axios from "axios";

export interface ProductResponse {
    id: string;
    title: string;
    discountedPrice?: string;
    description: string;
}

interface NewProduct {
    name: string;
    price: number;
}

interface UpdateProduct {
    id: number;
    name?: string;
    price?: number;
}

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await apiService.get<ProductResponse[]>("products/");
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail || "Erro ao buscar produtos. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};


export const createProduct = async (product: NewProduct): Promise<ProductResponse> => {
    try {
        const response = await apiService.post<ProductResponse>("products/", product);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail || "Erro ao criar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};


export const updateProduct = async (product: UpdateProduct): Promise<ProductResponse> => {
    try {
        const response = await apiService.put<ProductResponse>(`products/${product.id}/`, product);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail || "Erro ao atualizar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const deleteProduct = async (productId: number): Promise<void> => {
    try {
        await apiService.delete(`products/${productId}/`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail || "Erro ao deletar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
