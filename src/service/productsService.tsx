import apiService from "./apiService";
import axios from "axios";

export interface ProductResponse {
    id: string;
    title: string;
    original_price?: string;
    discounted_price?: string;
    description: string;
    favorited: boolean | undefined;
    rate: string;
    seller_name?: string;
    seller_id?: string;
    state?: string;
    city?: string;
    neighbourhood?: string;
    images: string[];
}

interface NewProduct {
    title: string;
    original_price: number;
    description: string;
    images: string[];
    category: string;
    category_id: number;
}

interface UpdateProduct {
    id: number;
    name?: string;
    price?: number;
}

export const getProductById = async (
    productId: string
): Promise<ProductResponse[]> => {
    try {
        const response = await apiService.get<ProductResponse[]>(
            `products/${productId}/`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
export const getProductBySellerId = async (
    seller_id: string | undefined
): Promise<ProductResponse[]> => {
    try {
        const response = await apiService.get<ProductResponse[]>(
            `products?seller_id=${seller_id}`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await apiService.get<ProductResponse[]>("products/");
        console.log(response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar produtos. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const createProduct = async (
    product: NewProduct | FormData
): Promise<ProductResponse> => {
    try {
        const response = await apiService.post<ProductResponse>(
            "products/",
            product,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao criar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const updateProduct = async (
    product: UpdateProduct
): Promise<ProductResponse> => {
    try {
        const response = await apiService.put<ProductResponse>(
            `products/${product.id}/`,
            product
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao atualizar produto. Tente novamente."
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
                error.response.data.detail ||
                    "Erro ao deletar produto. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
