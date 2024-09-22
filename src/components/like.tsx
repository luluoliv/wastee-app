import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import tw from "@/src/lib/tailwind";
import { ItemData } from "../data/items";

interface LikeButtonProps {
    item: ItemData;
    size?: "small" | "large";
    onFavoriteToggle: (id: string) => void; 
}

const LikeButton: React.FC<LikeButtonProps> = ({ item, size = "large", onFavoriteToggle }) => {
    const [liked, setLiked] = useState(item.favorited || false);

    useEffect(() => {
        setLiked(item.favorited || false);
    }, [item.favorited]);

    const handleLikePress = () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        onFavoriteToggle(item.id); 
    };

    const buttonSize = size === "small" ? "p-2" : "p-3";
    const iconSize = size === "small" ? 20 : 24;

    return (
        
            <TouchableOpacity
                style={tw`border rounded-full justify-center items-center ${buttonSize} ${
                    liked ? "bg-primary border-transparent" : "bg-transparent border-grayscale-60"
                }`}
                onPress={handleLikePress}
            >
                <FontAwesome
                    name={liked ? "heart" : "heart-o"}
                    size={iconSize}
                    color="#fbfcff"
                />
            </TouchableOpacity>
    );
};

export default LikeButton;
