import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { Comment } from "./items";
import { formatDate } from "../utils/formatDate";

interface ReviewCardProps {
    comment: Comment;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ comment }) => {
    const maxLengthComment = 100;
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

    const truncatedDescription =
    comment.comment.length > maxLengthComment
        ? comment.comment.slice(0, maxLengthComment) + "..."
        : comment.comment;
    return (
        <View
            style={tw`w-80 flex-col gap-y-3 bg-grayscale-20 rounded-xl p-5 border border-grayscale-60`}
        >
            <View style={tw`flex-row`}>{stars}</View>
            <Text style={tw`font-medium text-sm text-grayscale-60`}>
                {comment.user} • {formatDate(comment.date)}, {comment.time}
            </Text>
            <Text style={tw`font-normal text-base text-grayscale-100`}>
                {truncatedDescription}
            </Text>
        </View>
    );
};

export default ReviewCard;
