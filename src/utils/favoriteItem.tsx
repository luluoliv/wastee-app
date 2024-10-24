import { Alert } from "react-native";
import {
    addFavorite,
    FavoriteResponse,
    removeFavorite,
} from "../service/favoriteService";

export const favoriteItem = async (
    item: any,
    user: any,
    fetchProduct: () => Promise<void>
): Promise<FavoriteResponse | void> => {
    try {
        let response;

        if (!user?.id || !item?.id) {
            throw new Error("Usuário ou ID do produto está faltando.");
        }

        if (!item?.favorited) {
            const favoriteData = {
                user: user.id,
                product: String(item.id),
            };
            response = await addFavorite(favoriteData);
            Alert.alert("Produto favoritado.");
            
            fetchProduct();
        } else {
            const productId = String(item.id);
            response = await removeFavorite(productId);
            Alert.alert("Produto desfavoritado.");
            fetchProduct();
        }
        return response;
    } catch (error: any) {
        Alert.alert("Error", error.message || "Um erro inesperado aconteceu.");
        return undefined;
    }
};
