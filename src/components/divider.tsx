import { View, Text } from "react-native";
import React from "react";
import tw from "../lib/tailwind";

const Divider = () => {
    return <View style={tw`bg-grayscale-40 h-[1px] m-auto w-11/12`}></View>;
};

export default Divider;
