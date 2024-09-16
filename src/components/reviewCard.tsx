import { View, Text } from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import { Comment } from "./items";
import { FontAwesome } from "@expo/vector-icons";
import { formatDate } from "../utils/formatDate";

interface ReviewCardProps {
    comment: Comment;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ comment }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= comment.rating) {
            stars.push(
                <FontAwesome key={i} name="star" size={14} color="#FBFCFF" />
            );
        } else if (i - 0.5 <= comment.rating) {
            stars.push(
                <FontAwesome
                    key={i}
                    name="star-half-o"
                    size={14}
                    color="#FBFCFF"
                />
            );
        } else {
            stars.push(
                <FontAwesome key={i} name="star" size={14} color="#787F8D" />
            );
        }
    }
    return (
        <View
            style={tw`w-3/5 bg-grayscale-20 rounded-xl p-5 border border-grayscale-60`}
        >
            <View style={tw`flex-row`}>{stars}</View>
            <Text style={tw`font-medium text-sm text-grayscale-60`}>
                {comment.user} • {formatDate(comment.date)}, {comment.time}
            </Text>
            <Text style={tw`font-medium text-sm text-grayscale-60`}>
                {comment.user} • {formatDate(comment.date)}, {comment.time}
            </Text>
        </View>
    );
};

export default ReviewCard;
