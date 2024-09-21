import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";

import tw from "../lib/tailwind";
import { Comment } from "./items";
import { formatDate } from "../utils/formatDate";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dropdown from "./dropdown";
import ModalReport from "./modalReport";

interface ReviewProps {
    comment: Comment;
}

const Review: React.FC<ReviewProps> = ({ comment }) => {
    const router = useRouter();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isReport, setIsReport] = useState(false);

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

    const options = [
        {
            label: "Visitar perfil",
            icon: "user",
            action: () => router.push(`/user/${comment.user}`),
        },
        {
            label: "Compartilhar",
            icon: "share-2",
            action: () => console.log("Produto compartilhado."),
        },
        {
            label: "Denunciar",
            icon: "alert-circle",
            action: () => setIsReport(!isReport),
        },
    ];

    return (
        <View style={tw`w-full flex-col gap-y-3 bg-grayscale-20 rounded-xl`}>
            <Dropdown
                style={tw`top-4`}
                options={options}
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
            />
            <ModalReport visible={isReport} onClose={()=> setIsReport(false)}/>
                
            <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row`}>{stars}</View>
                <TouchableOpacity
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Feather name="more-horizontal" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={tw`font-medium text-sm text-grayscale-60`}>
                {comment.user} • {formatDate(comment.date)}, {comment.time}
            </Text>
            <Text style={tw`font-normal text-base text-grayscale-100`}>
                {comment.comment}
            </Text>
        </View>
    );
};

export default Review;
