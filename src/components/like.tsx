import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import tw from "@/src/lib/tailwind";
import { ProductResponse } from "../service/productsService";
import { FavoriteResponse } from "../service/favoriteService";

interface LikeButtonProps {
    item: ProductResponse;
    size?: "small" | "large";
    onFavoriteToggle: (id: string | undefined) => FavoriteResponse;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    item,
    size = "large",
    onFavoriteToggle,
}) => {
    const [liked, setLiked] = useState(item?.favorited || false);

    useEffect(() => {
        setLiked(item?.favorited || false);
    }, [item?.favorited]);

    const handleLikePress = () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        onFavoriteToggle(item?.id);
    };

    const buttonSize = size === "small" ? "p-2" : "p-3";
    const iconSize = size === "small" ? 20 : 24;

    return (
        <TouchableOpacity
            style={tw`border rounded-full justify-center items-center ${buttonSize} ${
                item?.favorited
                    ? "bg-primary border-transparent"
                    : "bg-transparent border-grayscale-60"
            }`}
            onPress={handleLikePress}
        >
            <FontAwesome
                name={item?.favorited ? "heart" : "heart-o"}
                size={iconSize}
                color="#fbfcff"
            />
        </TouchableOpacity>
    );
};

export default LikeButton;
