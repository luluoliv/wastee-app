import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Comment } from "@/src/data/items";
import tw from "../lib/tailwind";

interface ClassificationProps {
    comments: Comment[] | undefined;
    maxRating?: number;
    size?: number;
}

const Classification: React.FC<ClassificationProps> = ({
    comments,
    maxRating = 5,
    size = 20,
}) => {
    function calculateAverageRating(comments: Comment[] = []): number {
        if (comments.length === 0) return 0;

        const totalRating = comments.reduce(
            (acc, comment) => acc + comment.rating,
            0
        );
        return totalRating / comments.length;
    }

    const averageRating = calculateAverageRating(comments);
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        if (i <= averageRating) {
            stars.push(
                <FontAwesome key={i} name="star" size={size} color="#FBFCFF" />
            );
        } else if (i - 0.5 <= averageRating) {
            stars.push(
                <FontAwesome
                    key={i}
                    name="star-half-o"
                    size={size}
                    color="#FBFCFF"
                />
            );
        } else {
            stars.push(
                <FontAwesome key={i} name="star" size={size} color="#787F8D" />
            );
        }
    }

    return (
        <View style={tw`flex-row items-center gap-x-1`}>
            <View style={tw`flex-row`}>{stars}</View>
            <Text style={tw`text-base font-medium text-grayscale-100`}>
                ({comments?.length})
            </Text>
        </View>
    );
};

export default Classification;
