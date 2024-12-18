import apiService from "./apiService";
import axios from "axios";

export interface ProductResponse {
    id: string;
    title: string;
    chat_id: string;
    category_name: string;
    original_price?: string;
    discounted_price?: string;
    description: string;
    favorited: boolean;
    rate: string;
    seller_name?: string;
    seller_id?: string | undefined;
    state?: string;
    city?: string;
    neighborhood?: string;
    images: ProductImageResponse[];
}
export interface ProductImageResponse {
    id: string;
    image: string;
    external_image_url: string;
}

interface NewProduct {
    title: string;
    original_price: number;
    description: string;
    images: string[];
    category: string;
    category_id: number;
}
interface NewProductResponse {
    message: string;
    product: ProductResponse;
}

interface UpdateProduct {
    id: number;
    name?: string;
    price?: number;
}

export const getProductById = async (
    productId: string | null
): Promise<ProductResponse> => {
    try {
        const response = await apiService.get<ProductResponse>(
            `product-detail/${productId}/`
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
        const response = await apiService.get<ProductResponse[]>(`products/`, {
            params: { seller_id },
        });
        return response.data;
    } catch (error) {
        console.log(error);
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
): Promise<NewProductResponse> => {
    try {
        const response = await apiService.post<NewProductResponse>(
            "products/",
            product
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
