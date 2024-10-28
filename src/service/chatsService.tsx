import apiService from "./apiService";
import axios from "axios";

export interface ChatResponse {
    id: string;
    buyer: string;
    seller: string;
    seller_name: string;
    started_at: string;
    last_message?: LastMessageResponse;
    messages: MessageResponse[];
}

export interface LastMessageResponse {
    id: string;
    message: string;
    sender_name: string;
    sender_id: string;
    sent_at: string | number;
}

export interface MessageResponse {
    id: string;
    chat: string;
    sender: string;
    message: string;
    sent_at: string;
}

interface NewChat {
    buyer: string | undefined;
    seller: string | undefined;
}

export interface NewChatResponse {
    chat: ChatResponse;
    message: string;
}

interface NewMessage {
    chat: string;
    sender: string;
    message: string;
}

export const getChatById = async (chatId: string): Promise<ChatResponse> => {
    try {
        const response = await apiService.get<ChatResponse>(`chats/${chatId}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar o chat. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getChatsByUserId = async (
    userId: string
): Promise<ChatResponse[]> => {
    try {
        const response = await apiService.get<ChatResponse[]>(
            `chats?user_id=${userId}`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar os chats. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const getAllChats = async (): Promise<ChatResponse[]> => {
    try {
        const response = await apiService.get<ChatResponse[]>("chats/");
        return response.data;
    } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao buscar todos os chats. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const createChat = async (chat: NewChat): Promise<NewChatResponse> => {
    try {        
        const response = await apiService.post<NewChatResponse>("chats/", chat);        
        return response.data;
    } catch (error) {        
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.error ||
                    "Erro ao criar o chat. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const createMessage = async (
    message: NewMessage
): Promise<MessageResponse> => {
    try {
        const response = await apiService.post<MessageResponse>(
            "messages/",
            message
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao enviar a mensagem. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};

export const deleteChat = async (chatId: string | undefined): Promise<void> => {
    try {
        await apiService.delete(`chats/${chatId}/`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.detail ||
                    "Erro ao deletar o chat. Tente novamente."
            );
        } else {
            throw new Error("Erro desconhecido. Tente novamente.");
        }
    }
};
