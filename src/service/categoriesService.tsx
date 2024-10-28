import apiService from "./apiService";
import axios from "axios";

export interface CategoryResponse {
    id: string;
    name: string;
    description?: string;
}

interface NewCategory {
    name: string;
    description?: string;
}

interface UpdateCategory {
    id: number;
    name?: string;
    description?: string;
}

export const getCategoryById = async (categoryId: number): Promise<CategoryResponse> => {
    try {
        const response = await apiService.get<CategoryResponse>(`categories/${categoryId}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar a categoria. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
    try {
        const response = await apiService.get<CategoryResponse[]>("categories/");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar todas as categorias. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const createCategory = async (category: NewCategory): Promise<CategoryResponse> => {
    try {
        const response = await apiService.post<CategoryResponse>("categories/", category);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao criar a categoria. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const updateCategory = async (category: UpdateCategory): Promise<CategoryResponse> => {
    try {
        const response = await apiService.put<CategoryResponse>(`categories/${category.id}/`, category);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao atualizar a categoria. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
    try {
        await apiService.delete(`categories/${categoryId}/`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao deletar a categoria. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
