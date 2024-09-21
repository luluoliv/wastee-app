import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

interface StarProps {
    filled: boolean;
    onPress: () => void;
}

const Star: React.FC<StarProps> = ({ filled, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesome
                name={filled ? "star" : "star-o"}
                size={28}
                color="#fbfcff"
            />
        </TouchableOpacity>
    );
};

export default Star;
