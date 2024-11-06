import apiService from "./apiService";
import axios from "axios";

export interface CommentResponse {
    id: string;
    user: string;
    user_name: string;
    product: string;
    comment: string;
    rating: number;
    date: string;
    formatted_time: string;
    time: string;
}

export interface NewComment {
    user: string | undefined;
    product: string | undefined;
    comment: string;
    rating: number;
}

export const getComments = async (productId: string): Promise<CommentResponse[]> => {
    try {
        const response = await apiService.get<CommentResponse[]>(`comments/?product_id=${productId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar os comentários. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getCommentsBySellerId = async (sellerId: string): Promise<CommentResponse[]> => {
    try {
        const response = await apiService.get<CommentResponse[]>(`comments/?seller_id=${sellerId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar os comentários. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const addComment = async (
    comment: NewComment | undefined
): Promise<CommentResponse> => {
    try {
        const response = await apiService.post<CommentResponse>(
            "comments/",
            comment
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao adicionar o comentário. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const removeComment = async (commentId: string): Promise<void> => {
    try {
        await apiService.delete(`comments/${commentId}/`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao remover o comentário. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
